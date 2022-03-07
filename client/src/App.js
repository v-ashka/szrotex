import React, {useState} from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from './pages/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Home from './components/Home'
import UserList from './pages/UserList'
import GlobalNavbar from './components/GlobalNavbar';
import Edit from './pages/Edit';
import Delete from './pages/Delete'
import Footer from './pages/Footer'
import { Container } from 'react-bootstrap'
import ProductItem from './components/ProductItem'
import UserProfile from './pages/UserProfile'

function App() {

  const [query, setQuery] = useState('');
  const [voivodeship, setVoivode] = useState('');

  const onClick = () =>{
    console.log('przycisk nacisniety');
    console.log('query: ', query);
    console.log('woj:', voivodeship)
  }

  const handleVoivodeChange = (e) => {

    console.log(e.target.value)
    setVoivode(e.target.value)
  }


  const onChangeQuery = (e) => {
    setQuery(e.target.value)
  }
  return (
    <BrowserRouter> 
      <GlobalNavbar value={query} onChange={onChangeQuery} onClick={onClick} onChangeVoivode={handleVoivodeChange} />
        <Container>
        <Routes>
            <Route index element={<Home/>} />
            <Route path="register" exact element={<Register/>}/>
            <Route path="login" exact element={<Login/>} />
            <Route path="dashboard" exact element={<Dashboard />} />
          <Route path="list" element={<UserList value={query} onClick={onClick} checkedVoivode={voivodeship}/>} />
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
