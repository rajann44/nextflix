'use client';

import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import PaginationControls from './PaginationControls';
import { DailymotionVideo } from '../types/dailymotion';

interface CategoryResultsProps {
  initialMovies: DailymotionVideo[];
  initialPagination: {
    currentPage: number;
    hasMore: boolean;
    totalPages: number;
    totalResults: number;
  };
  categorySlug: string;
}

const CategoryResults = ({ initialMovies, initialPagination, categorySlug }: CategoryResultsProps) => {
  const [movies, setMovies] = useState<DailymotionVideo[]>(initialMovies);
  const [pagination, setPagination] = useState(initialPagination);

  useEffect(() => {
    setMovies(initialMovies);
    setPagination(initialPagination);
  }, [initialMovies, initialPagination]);

  if (movies.length === 0) {
    return (
      <div className="text-gray-400">
        <p>No videos found in this category.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie: DailymotionVideo, index: number) => (
          <div key={movie.id} className="aspect-[16/9]">
            <MovieCard
              {...movie}
              index={index}
            />
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <PaginationControls
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          hasMore={pagination.hasMore}
          searchQuery={categorySlug}
          isCategory={true}
        />
      </div>
    </>
  );
};

export default CategoryResults; 