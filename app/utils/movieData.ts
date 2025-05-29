import dailyData from '../data/daily.json'

export type Movie = {
  id: string
  title: string
  thumbnail_480_url: string
  url: string
  channel: string
  'owner.screenname': string
  views_total: number
  duration: number
}

export function getAllMovies(): Movie[] {
  return dailyData.list
}

export function getMoviesByChannel(channel: string): Movie[] {
  return dailyData.list.filter(movie => movie.channel === channel)
}

export function getMovieById(id: string): Movie | undefined {
  return getAllMovies().find(movie => movie.id === id)
}

export function getChannels(): string[] {
  return Array.from(new Set(dailyData.list.map(movie => movie.channel)))
} 