import movieData from '../data/movies.json'

export type Movie = {
  id: string
  title: string
  image: string
  description: string
  rating: string
  year: string
  duration: string
  category: string
}

export type MovieCategory = 'trending' | 'popular' | 'continueWatching' | 'myList'

export function getMoviesByCategory(category: MovieCategory): Movie[] {
  return movieData[category] || []
}

export function getAllMovies(): Movie[] {
  return [
    ...movieData.trending,
    ...movieData.popular,
    ...movieData.continueWatching,
    ...movieData.myList
  ]
}

export function getCategories(): string[] {
  return movieData.categories
}

export function getMovieById(id: string): Movie | undefined {
  return getAllMovies().find(movie => movie.id === id)
} 