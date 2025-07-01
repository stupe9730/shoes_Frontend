import React, { useEffect, useState } from 'react'
import Home from './Page/Home'
import Admin from './Page/Admin'
import Footer from './Page/Footer'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './Nav/Navbar'
import Men from './Page/Men'
import Women from './Page/Women'
import Cart from './Page/Cart'
import Login from './Page/Login'
import ShopingCart from './Page/ShopingCart'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './Page/Register'
import Kid from './Page/Kid'
import CheckOut from './Page/CheckOut'
import Protected from './Page/Protected'
import AdminProtected from './Page/AdminProtected'
import Order from './Page/Order'
import { useDispatch } from 'react-redux'
import { useLazyGetCartQuery } from './redux/userApi'
import { logOut } from './redux/adminSlice'
import Histroy from './Page/History'


const App = () => {
  const dispatch = useDispatch()
  const [auther, { error: authError }] = useLazyGetCartQuery()
  const [darkMode, setDarkMode] = useState(() => {
    // Use value from localStorage if it exists, otherwise default to false
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Apply the dark mode class to the document and save the preference in localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save the preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Toggle function for dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // useEffect(() => {
  //   auther()
  // }, [])
  // useEffect(() => {
  //   if (authError) {
  //     dispatch(logOut())
  //   }
  // }, [authError])


  return <div className='dark:bg-black'>
    <BrowserRouter>
      <ToastContainer />
      <Navbar toggleDarkMode={toggleDarkMode} dark={darkMode} />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/men' element={<Men />} />
        <Route path='/women' element={<Women />} />
        <Route path='/kid' element={<Kid />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart/:_id' element={<Cart />} />
        <Route path='/shoping' element={<Protected Compo={ShopingCart} />} />
        <Route path='/checkout' element={<Protected Compo={CheckOut} />} />
        <Route path='/order' element={<Protected Compo={Order} />} />
        <Route path='/histroy' element={<Protected Compo={Histroy} />} />

        {/* <Route path='/admin' element={<><Outlet /></>}>
          <Route index element={<Products />}></Route>
        </Route>
         */}
        <Route path='/admin' element={<AdminProtected Compo={Admin} />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>

      < Footer />
    </BrowserRouter >
    {/* <Admin /> */}
  </div>
}

export default App