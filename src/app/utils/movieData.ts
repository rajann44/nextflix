import { DailymotionApiUtil } from './dailymotionApi';
import { DailymotionVideo } from '../types/dailymotion';

type Movie = DailymotionVideo;

interface CachedMovies {
    [key: string]: Movie[];
}

let cachedMovies: CachedMovies | null = null;

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[&]/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export const channelMap = {
    'Music': { key: 'MUSIC', slug: 'music' },
    'Comedy & Entertainment': { key: 'COMEDY', slug: 'comedy-and-entertainment' },
    'Gaming': { key: 'GAMING', slug: 'gaming' },
    'People & Culture': { key: 'PEOPLE', slug: 'people-and-culture' },
    'Lifestyle & How-To': { key: 'LIFESTYLE', slug: 'lifestyle-and-how-to' },
    'Education': { key: 'EDUCATION', slug: 'education' },
    'News': { key: 'NEWS', slug: 'news' }
} as const;

export async function getAllMovies(): Promise<CachedMovies> {
    if (cachedMovies) {
        return cachedMovies;
    }

    try {
        const channels = [
            { key: 'MUSIC', title: 'Music', slug: 'music' },
            { key: 'COMEDY', title: 'Comedy & Entertainment', slug: 'comedy-and-entertainment' },
            { key: 'GAMING', title: 'Gaming', slug: 'gaming' },
            { key: 'PEOPLE', title: 'People & Culture', slug: 'people-and-culture' },
            { key: 'LIFESTYLE', title: 'Lifestyle & How-To', slug: 'lifestyle-and-how-to' },
            { key: 'EDUCATION', title: 'Education', slug: 'education' },
            { key: 'NEWS', title: 'News', slug: 'news' }
        ] as const;

        const moviesByCategory: CachedMovies = {};

        // Fetch videos for each channel
        for (const channel of channels) {
            const response = await DailymotionApiUtil.fetchVideosByChannel(channel.key);
            moviesByCategory[channel.title] = response.list;
        }

        cachedMovies = moviesByCategory;
        return cachedMovies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        cachedMovies = {};
        return cachedMovies;
    }
}

export async function getMoviesByCategory(category: string, page: number = 1, limit: number = 20, sort: string = 'trending'): Promise<{ results: Movie[], pagination: { currentPage: number, hasMore: boolean, totalPages: number, totalResults: number } }> {
    // Find the channel key for the given category
    const channelEntry = Object.entries(channelMap).find(([_, value]) => value.slug === category);
    if (!channelEntry) {
        return {
            results: [],
            pagination: {
                currentPage: 1,
                hasMore: false,
                totalPages: 0,
                totalResults: 0
            }
        };
    }

    const channelKey = channelEntry[1].key;

    try {
        const response = await DailymotionApiUtil.fetchVideosByChannel(channelKey, { limit, page, sort });
        return {
            results: response.list,
            pagination: {
                currentPage: response.page || 1,
                hasMore: response.has_more || false,
                totalPages: Math.ceil((response.total || 0) / limit),
                totalResults: response.total || 0
            }
        };
    } catch (error) {
        console.error('Error fetching category movies:', error);
        return {
            results: [],
            pagination: {
                currentPage: 1,
                hasMore: false,
                totalPages: 0,
                totalResults: 0
            }
        };
    }
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
    const allMovies = await getAllMovies();
    for (const category in allMovies) {
        const movies: Movie[] = allMovies[category];
        const movie = movies.find((m: Movie) => m.id === id);
        if (movie) {
            return movie;
        }
    }
    return undefined;
}

export async function getChannels(): Promise<string[]> {
    const movies = await getAllMovies();
    // Get unique channels with their special words
    const uniqueChannels = new Set<string>();
    Object.values(movies).forEach(movieList => {
        movieList.forEach(movie => {
            if (movie.channel) {
                uniqueChannels.add(movie.channel);
            }
        });
    });
    return Array.from(uniqueChannels);
}

export async function getSearchResults(query: string, page: number = 1, limit: number = 20, sort: string = 'relevance') {
    try {
        const response = await fetch(
            `https://api.dailymotion.com/videos?search=${encodeURIComponent(query)}&fields=id,title,channel,thumbnail_480_url,url,owner.screenname,views_total,duration&limit=${limit}&page=${page}&sort=${sort}`
        )
        const data = await response.json()
        return {
            results: data.list || [],
            pagination: {
                currentPage: data.page || 1,
                hasMore: data.has_more || false,
                totalPages: Math.ceil((data.total || 0) / limit),
                totalResults: data.total || 0
            }
        }
    } catch (error) {
        console.error('Error fetching search results:', error)
        return {
            results: [],
            pagination: {
                currentPage: 1,
                hasMore: false,
                totalPages: 0,
                totalResults: 0
            }
        }
    }
}

export function getCategoryTitleFromSlug(slug: string): string | undefined {
    const entry = Object.entries(channelMap).find(([_, value]) => value.slug === slug);
    return entry ? entry[0] : undefined;
} 