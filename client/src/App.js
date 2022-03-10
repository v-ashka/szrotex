import React, {useState} from "react";
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from './pages/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Home from './components/Home'
import UserList from './pages/UserList/UserList.js'
import GlobalNavbar from './components/GlobalNavbar';
import Edit from './pages/Edit';
import Delete from './pages/Delete'
import Footer from './pages/Footer'
import { Container } from 'react-bootstrap'
import ProductItem from './components/ProductItem/ProductItem.js'
import UserProfile from './pages/UserProfile/UserProfile.js'
import "./styles/style.css"
function App() {
  const [query, setQuery] = useState('');
  const [voivodeship, setVoivode] = useState('');
  const [category, setCategory] = useState('');
  const [clicked, setClicked] = useState(false);

  const onClick = () => {
    setClicked(true);
  }

  const handleVoivodeChange = (e) => {

    console.log(e.target.value)
    setVoivode(e.target.value)
  }

  const handleProductCategory = (e) => {
    console.log(e.target.value)
    setCategory(e.target.value);
  }

  const handleClickBtn = () => {
    console.log('clicked');
  }

  const onChangeQuery = (e) => {
    setQuery(e.target.value)
  }
  return (
    <BrowserRouter> 
      <GlobalNavbar value={query} onChange={onChangeQuery} onClick={onClick} onChangeVoivode={handleVoivodeChange} handleProductCategory={handleProductCategory} handleClickBtn={ handleClickBtn}/>
        <Container>
        <Routes>
            <Route index element={<Home/>} />
            <Route path="register" exact element={<Register/>}/>
            <Route path="login" exact element={<Login/>} />
            <Route path="dashboard" exact element={<Dashboard />} />
          <Route path="list" element={<UserList value={query} isClicked={clicked} checkedVoivode={voivodeship} category={category}/>} />
            <Route path="list/:id" element={<ProductItem/>}/>
            <Route path="dashboard/edit/:id" element={<Edit/>} />
            <Route path="dashboard/delete/:id" element={<Delete/>} />
            <Route path="user/:id" element={<UserProfile/>}/>
          </Routes>
        </Container>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
