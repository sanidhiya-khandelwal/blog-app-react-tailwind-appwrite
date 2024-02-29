import { useState } from 'react'
import './App.css'
import conf from './conf/conf'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Footer, Header } from './components/index'
import { Outlet } from 'react-router-dom';
function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(
        () => setLoading(false)
      )
  }, [])
  return !loading ? (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className='w-full h-[12rem]'>
      <img className='m-auto mt-5 h-full' src="/spinner.gif" alt="spinner" />
    </div>
  )
}

export default App
