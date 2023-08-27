import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Crudmurid from "./components/CrudStudent/Crudmurid";
import { ToastContainer } from 'react-toastify';
import FormAddMurid from "./components/CrudStudent/FormAddMurid";
import NotFound from "./components/NotFound";
import EditMurid from "./components/CrudStudent/EditMurid";

function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path="/murid" element={<Crudmurid/>}></Route>
      <Route path="/murid/add" element={<FormAddMurid/>}></Route>
      <Route path="/murid/update/:id" element={<EditMurid/>}></Route>
      <Route path="*" element={<Navigate to={<NotFound/>}/>}></Route>
    </Routes>
    

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      {/* Same as */}
    <ToastContainer />
    </>
  )
}

export default App;
