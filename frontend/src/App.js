import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Register from './components/Register';
import Login from './components/Login';
import Cards from './components/Cards';
import { useCookies } from "react-cookie";
const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
// console.log(cookies)

  return (
    <>
    
    <Navbar cookies={cookies}/>
    <Routes>
    <Route exact path="/" cookies={cookies} element={<Cards />} />
    <Route path='Register' element={<Register/>}></Route>
    <Route path='Login' element={<Login/>}></Route>
    </Routes>
    </>
  )
}

export default App
