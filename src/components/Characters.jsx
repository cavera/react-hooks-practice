import { useState, useEffect, useReducer } from 'react'
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

const charactersApi = 'https://rickandmortyapi.com/api/character/?page=10'

const Characters = () => {
  const [CharactersList, setCharactersList] = useState([])
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
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

  return (
    <>
      <ul>
        {favorites.favorites?.map(favorite => (
          <li key={favorite.name}>{favorite.name}</li>
        ))}
      </ul>
      <div className='Characters'>
        {CharactersList?.map(character => (
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
