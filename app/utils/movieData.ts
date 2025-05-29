import { DailymotionApiUtil } from '../../src/utils/dailymotionApi';
import { DailymotionVideo } from '../../src/types/dailymotion';

export type Movie = DailymotionVideo;

let cachedMovies: Movie[] | null = null;

export async function getAllMovies(): Promise<Movie[]> {
    if (cachedMovies) {
        return cachedMovies;
    }

    try {
        const response = await DailymotionApiUtil.fetchTrendingVideos();
        
        // Create a map to track which special word is assigned to each base channel
        const channelWordMap = new Map<string, string>();
        let wordIndex = 0;

        // Transform the channel names before caching
        cachedMovies = response.list.map((movie) => {
            const baseChannel = movie.channel;
            
            // If this channel hasn't been assigned a word yet, assign one
            if (!channelWordMap.has(baseChannel)) {
                channelWordMap.set(baseChannel, DailymotionApiUtil.CHANNEL_WORDS[wordIndex % DailymotionApiUtil.CHANNEL_WORDS.length]);
                wordIndex++;
            }

            return {
                ...movie,
                channel: `${baseChannel} - ${channelWordMap.get(baseChannel)}`
            };
        });
        
        return cachedMovies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        cachedMovies = [];
        return cachedMovies;
    }
}

export async function getMoviesByChannel(channel: string): Promise<Movie[]> {
    const movies = await getAllMovies();
    // Extract the base channel name (without the special word) for filtering
    const baseChannel = channel.split(' - ')[0];
    return movies.filter(movie => {
        const movieBaseChannel = movie.channel.split(' - ')[0];
        return movieBaseChannel === baseChannel;
    });
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
    const movies = await getAllMovies();
    return movies.find(movie => movie.id === id);
}

export async function getChannels(): Promise<string[]> {
    const movies = await getAllMovies();
    // Get unique channels with their special words
    const uniqueChannels = new Set(movies.map(movie => movie.channel));
    return Array.from(uniqueChannels);
} 