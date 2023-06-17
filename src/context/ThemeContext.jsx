import { useState, createContext } from 'react'

export const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
  const [color, setColor] = useState('blue')
  return (
    <ThemeContext.Provider
      value={{
        color,
        setColor
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
