import { useState } from 'react'
import './App.css'


import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/app/store";

import GuestGuard from "./guards/GuestGuard";
import AuthGuard from "./guards/AuthGuard";

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
import Multiple from './pages/selection/multiple';

function App() {
  
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>

          <Router>
              <Header/>
              <Layout>
                <Routes>
                  <Route path="/" element={<AuthGuard><Result /></AuthGuard>} />
                  <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
                  <Route path="/result" element={<AuthGuard><Result /></AuthGuard>} />
                  <Route path='/list' element={<AuthGuard><List /></AuthGuard>} />
                  <Route path='/multiple' element={<AuthGuard><Multiple /></AuthGuard>} />
                </Routes>
              </Layout>

              <Footer/>
          </Router>
    
      </PersistGate>
    </Provider>
  )
}

export default App