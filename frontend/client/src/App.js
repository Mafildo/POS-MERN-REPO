import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ItemsPage from './Pages/ItemsPage';
import CartPage from './Pages/CartPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/items' element={<ItemsPage/>} />
        <Route path='/cart' element={<CartPage/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App