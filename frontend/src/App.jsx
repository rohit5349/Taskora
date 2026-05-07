import { BrowserRouter ,  Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar.jsx';
import Login from './component/Login.jsx';
import Home from './pages/Home.jsx';
import Footer from './component/Footer.jsx';
import Dashboard from './component/Dashboard.jsx';


function App() {
  return (
    <div>
       <Navbar/>
     <div className='min-h-[70vh] pt-23'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
     </div>
      <Footer/>
    </div>
  );
}

export default App;
