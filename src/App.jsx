import './App.css'


import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/app/store";

import AdminGuard from './guards/AdminGuard';
import GuestGuard from "./guards/GuestGuard";
import AuthGuard from "./guards/AuthGuard";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';


import Header from './components/Header';
import Layout from './components/Layout';

  import UserLogin from "./pages/login/UserLogin"
  import AdminLogin from "./pages/login/AdminLogin"

import Footer from './components/Footer';
import List from './pages/result/list';
import ListDetail from './pages/result/list-detail';
import AddFile from './pages/result/addFile';

function App() {
  
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>

          <Router>
              <Header/>
              <Layout>
                <Routes>
                  <Route path="/" element={<AdminGuard><AddFile /></AdminGuard>} />

                  <Route path="/addfile" element={<AdminGuard><AddFile /></AdminGuard>} />
                  <Route path="/addfile/:id" element={<AdminGuard><AddFile /></AdminGuard>} />

                  <Route path="/login" element={<GuestGuard><UserLogin /></GuestGuard>} />
                  <Route path="/panel-login" element={<GuestGuard><AdminLogin /></GuestGuard>} />
                  <Route path="/result" element={<AdminGuard><AddFile /></AdminGuard>} />

                  <Route path='/list' element={<AdminGuard><List /></AdminGuard>} />
                  <Route path='/list/:id' element={<ListDetail />} />

                </Routes>
              </Layout>

              <Footer/>
          </Router>
    
      </PersistGate>
    </Provider>
  )
}

export default App