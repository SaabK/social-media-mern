import './index.css';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { Container } from '@material-ui/core';
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export function Root() {
  return (
    <Container maxWidth="lg">
      <GoogleOAuthProvider clientId="405747554597-p2mkhp4h4mk92fnmreojhojf7fhpqfvr.apps.googleusercontent.com">
        <Navbar />
        <Outlet />
      </GoogleOAuthProvider>
    </Container>
  )
}

export default App;