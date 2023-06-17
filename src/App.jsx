import Header from './components/Header'
import Characters from './components/Characters'
import { ThemeContextProvider } from './context/ThemeContext'

function App () {
  return (
    <ThemeContextProvider>
      <main>
        <Header />
        <Characters />
      </main>
    </ThemeContextProvider>
  )
}

export default App
