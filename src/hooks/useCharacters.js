import { useState, useEffect } from 'react'

export const useCharacters = url => {
  const [charactersList, setCharactersList] = useState([])
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setCharactersList(data.results))
      .catch(error => console.log(error))
  }, [url])
  return charactersList
}
