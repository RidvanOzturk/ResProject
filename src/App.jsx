import { useState } from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  BrowserRouter
} from 'react-router-dom';

import Header from './Header';
import Layout from './Layout';

  import Login from "./pages/login"
  import Result from "./pages/result"

import Footer from './Footer';

function App() {

  return (
    <Router>

        <Header/>

        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </Layout>

        <Footer/>

    </Router>
  )
}

export default App