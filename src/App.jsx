import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import GameCanvas from './components/GameCanvas';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className = 'min-h-screen bg-gray-100 p-4'>
      <header className = 'text-center mb-6'>
        <h1 className = 'text-4xl font-bold text-emerald-600 mb-2'>Mega-Futbol</h1>
        <button className = 'bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded'>
          Play Now
        </button>
      </header>
      <main>
        <GameCanvas />
      </main>
    </div>
  )
}

export default App
