import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import AddCategory from './components/AddCategory';
import Header from './components/Header';
import ErrorPage from './components/ErrorPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';


function App() {
  return (
    <div className='container-fluide pb-3'>
        <BrowserRouter className="container mt-3">
          <Header/>
          <Routes>
          <Route path='/' element={<Dashboard/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/addProduct' element={<AddProduct/>}/>
            <Route path='/addCategory' element={<AddCategory/>}/>
            <Route path='/updateProduct/:id' element={<UpdateProduct/>} />
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
          
        </BrowserRouter>
    </div>
    
  );
}

export default App;
