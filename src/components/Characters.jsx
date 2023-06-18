import {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback
} from 'react'
import CharacterCard from './CharacterCard'
import Search from './Search'

const initialState = {
  favorites: []
}

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    default:
      return state
  }
}

const charactersApi = 'https://rickandmortyapi.com/api/character/?page=1'

const Characters = () => {
  const [charactersList, setCharactersList] = useState([])
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
  const [search, setSearch] = useState('')
  const searchInput = useRef(null)

  useEffect(() => {
    fetch(charactersApi)
      .then(response => response.json())
      .then(data => setCharactersList(data.results))
      .catch(error => console.log(error))
  }, [])

  const handleClick = favorite => {
    dispatch({
      type: 'ADD_FAVORITE',
      payload: favorite
    })
  }

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value)
  // }

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value)
  }, [])

  const filteredCharacters = useMemo(() => {
    return charactersList.filter(character => {
      return character?.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [charactersList, search])

  return (
    <>
      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />
      <ul>
        {favorites.favorites?.map(favorite => (
          <li key={favorite.name}>{favorite.name}</li>
        ))}
      </ul>
      <div className='Characters'>
        {filteredCharacters?.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
  )
}

export default Characters
