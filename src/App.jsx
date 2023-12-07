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

import Header from './components/Header';
import Layout from './components/Layout';

  import Login from "./pages/login"
  import Result from "./pages/result"

import Footer from './components/Footer';
import List from './pages/result/list';

function App() {

  return (
    <Router>

        <Header/>

        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/result" element={<Result />} />
            <Route path='/list' element={<List />} />
          </Routes>
        </Layout>

        <Footer/>

    </Router>
  )
}

export default App