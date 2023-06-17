import { useState, useEffect, useReducer, useMemo } from 'react'
import CharacterCard from './CharacterCard'

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

  const handleSearch = e => {
    setSearch(e.target.value)
  }

  // const filteredCharacters = charactersList.filter(character => {
  //   return character?.name.toLowerCase().includes(search.toLowerCase())
  // })

  const filteredCharacters = useMemo(() => {
    return charactersList.filter(character => {
      return character?.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [charactersList, search])

  return (
    <>
      <div className='search'>
        <input type='text' value={search} onChange={handleSearch} />
      </div>
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
