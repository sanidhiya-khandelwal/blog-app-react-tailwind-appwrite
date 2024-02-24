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
    <div>
      <h1>loading....</h1>
    </div>
  )
}

export default App
