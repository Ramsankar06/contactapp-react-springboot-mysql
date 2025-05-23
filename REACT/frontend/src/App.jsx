import React from "react"
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import ManageContacts from './pages/ManageContacts';
import ViewContacts from './pages/ViewContacts';
import Navigation from "./components/Navigation";
function App() {
  return (
    <BrowserRouter>
    <Navigation/>
    <div className="container py-4">
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/manage" element={<ManageContacts/>} ></Route>
      <Route path="/view" element={<ViewContacts/>} ></Route>
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
