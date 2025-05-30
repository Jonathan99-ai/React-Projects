import './App.css'
import { useRef, useState, useEffect, useCallback } from 'react'
import { useMovies } from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    
    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }
    
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula de solo numeros')
      return
    }
    
    if (search.length < 3 ) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }
    
    setError(null)
  }, [search])
  
  return { search, updateSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort }) 
  
  const debouncedGetMovies = useCallback(debounce(search => {
    console.log('search', search)
    getMovies({ search })
  }, 300), [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }
  
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }
  
  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de peliculas</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='search' placeholder='Avengers, Star Wars, The Marix ...' />
            <input type="checkbox" onChange={handleSort} checked={sort} />
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </header>

        <main>
            {
              loading ? <p>Cargando...</p> : <Movies movies={ movies }/>
            }
        </main>
      </div>
    </>
  )
}

export default App
