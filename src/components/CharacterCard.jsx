const CharacterCard = ({ character, handleClick }) => {
  return (
    <article className='Charcter-card'>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <button className='favorite' onClick={() => handleClick(character)}>
        Add to favorites
      </button>
      {/* <p>{character.species}</p>
      <p>{character.status}</p>
      <p>{character.gender}</p> */}
    </article>
  )
}

export default CharacterCard
