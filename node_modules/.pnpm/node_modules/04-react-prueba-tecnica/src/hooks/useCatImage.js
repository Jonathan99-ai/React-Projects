import { useState, useEffect } from 'react'
import { createClient } from 'pexels'

const client = createClient('JTdD1NKA5dB2IdBRqdTwCG8MT9IqfhlsyrU9OD4JjJ4fI959ovQGlrux')

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  // get an image for every new fact
  useEffect(() => {
    if (!fact) return
    // pass the first three words to the query
    const query = fact.split(' ', 3).join(' ')

    client.photos.search({ query, per_page: 1 })
      .then(response => {
        const { photos } = response
        setImageUrl(photos[0].src.medium)
      })
  }, [fact])

  return { imageUrl }
}
