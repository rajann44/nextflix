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
        cachedMovies = response.list;
        return cachedMovies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        cachedMovies = [];
        return cachedMovies;
    }
}

export async function getMoviesByChannel(channel: string): Promise<Movie[]> {
    const movies = await getAllMovies();
    return movies.filter(movie => movie.channel === channel);
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
    const movies = await getAllMovies();
    return movies.find(movie => movie.id === id);
}

export async function getChannels(): Promise<string[]> {
    const movies = await getAllMovies();
    return Array.from(new Set(movies.map(movie => movie.channel)));
} 