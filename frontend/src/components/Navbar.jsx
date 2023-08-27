/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const refreshToken = Cookies.get('refreshToken');

  const data = async () => {
    try {
       await axios.get('http://localhost:3000/murid/getData', {
            headers: {
                Authrorization: `Bearer ${refreshToken}`
            }
        })
        setLogin(true)
    } catch (error) {
        console.error("Error:", error.response.data.message);
    }
  }

  const mauLogot = async () => {
    try {
        Cookies.remove('refreshToken');
        setLogin(false)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }
  
  useEffect(() => {
    if(!login) {
        data()
    }
  })

  return (
    <nav>
        <div className="container mx-auto p-3">
            <div className="flex justify-between items-center">
                <div className="logo">
                    <a href="/" className='font-bold text-2xl'>StfdenDev</a>
                </div>
                <div className="font-medium">
                    {login && <a href="/murid" className='mr-2'>Product</a>}
                </div>
                {login ? (
                    <button onClick={mauLogot} className="">Logout</button>
                ) : (
                    <div className="font-medium text-lg ">
                        <a href="/login" className='mr-4'>Login</a>
                        <a href="/signup">Signup</a>
                    </div>
                )}
            </div>
        </div>
    </nav>
  )
}

export default Navbar