import { DailymotionApiUtil } from './dailymotionApi';
import { DailymotionVideo } from '../types/dailymotion';

type Movie = DailymotionVideo;

interface CachedMovies {
    [key: string]: Movie[];
}

let cachedMovies: CachedMovies | null = null;

export async function getAllMovies(): Promise<CachedMovies> {
    if (cachedMovies) {
        return cachedMovies;
    }

    try {
        const channels = [
            { key: 'MUSIC', title: 'Music' },
            { key: 'COMEDY', title: 'Comedy & Entertainment' },
            { key: 'GAMING', title: 'Gaming' },
            { key: 'PEOPLE', title: 'People & Culture' },
            { key: 'LIFESTYLE', title: 'Lifestyle & How-To' },
            { key: 'EDUCATION', title: 'Education' },
            { key: 'NEWS', title: 'News' }
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

export async function getMoviesByCategory(category: string, page: number = 1, limit: number = 20): Promise<{ results: Movie[], pagination: { currentPage: number, hasMore: boolean, totalPages: number, totalResults: number } }> {
    // Find the channel key for the given category
    const channelMap = {
        'Music': 'MUSIC',
        'Comedy & Entertainment': 'COMEDY',
        'Gaming': 'GAMING',
        'People & Culture': 'PEOPLE',
        'Lifestyle & How-To': 'LIFESTYLE',
        'Education': 'EDUCATION',
        'News': 'NEWS'
    } as const;

    const channelKey = channelMap[category as keyof typeof channelMap];
    if (!channelKey) {
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

    try {
        const response = await DailymotionApiUtil.fetchVideosByChannel(channelKey, { limit, page });
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

export async function getSearchResults(query: string, page: number = 1, limit: number = 20) {
    try {
        const response = await fetch(
            `https://api.dailymotion.com/videos?search=${encodeURIComponent(query)}&fields=id,title,channel,thumbnail_480_url,url,owner.screenname,views_total,duration&limit=${limit}&page=${page}`
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