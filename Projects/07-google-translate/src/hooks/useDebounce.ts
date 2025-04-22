import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 500) {
  const [debounceValue, setDebaunceValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebaunceValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debounceValue
}
