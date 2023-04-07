import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Game_01 from './games/Game_01'
import Game_02 from './games/Game_02'
import Game_03 from './games/Game_03'
import HomePage from './component/HomePage'

function App() {
  return (
    // <div className="App">
    //   {/* <Game_01 /> */}
    //   <Game_02 />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage buttonLinks={['/1', '/2', '/3']} />}
        ></Route>
        <Route path="/1" element={<Game_01 />} />
        <Route path="/2" element={<Game_02 />} />
        <Route path="/3" element={<Game_03 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
