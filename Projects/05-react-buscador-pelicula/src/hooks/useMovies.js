import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
      if (search === previousSearch.current) return

      try {
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (e) {
        setError(e.message)
      } finally {
        //tanto en el try como en el catch
        setLoading(false)
      }
    }
  )

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}