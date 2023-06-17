import { useState, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const Header = () => {
  const [darkmode, setDarkmode] = useState(false)
  const { color } = useContext(ThemeContext)

  const handleClick = () => {
    setDarkmode(!darkmode)
  }

  return (
    <div className='Header'>
      <h1 style={{ color: color }}>ReactHooks</h1>
      <button type='button' onClick={handleClick}>
        {!darkmode ? 'Light mode' : 'Dark mode'}
      </button>
    </div>
  )
}

export default Header
