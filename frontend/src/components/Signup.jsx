import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const navigate = useNavigate();

    const daftar = async (e) => {
        e.preventDefault();

        const data = {
            username,
            email,
            password,
        };

        try {
            await axios.post('http://localhost:3000/daftar', data)
            navigate('/login')
            toast.success('AKUN ANDA BERHASIL TERDAFTAR')
        } catch (error) {
            toast.error('Masukan data yang benar!')
            console.log(error);
        }
    }
  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="w-1/2 bg-slate-600 p-8 shadow-lg rounded-3xl">
            <h1 className="text-4xl mb-2 font-bold text-center text-white">Daftar Akun</h1>
            <form onSubmit={daftar} action="" className="flex flex-col">
                <label htmlFor="" className="text-white mb-2">Username</label>
                <input type="text" className="bg-slate-500 p-2 mb-4" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="" className="text-white mb-2">Email</label>
                <input type="text" className="bg-slate-500 p-2 mb-4 " value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="" className="text-white mb-2">password</label>
                <input type="password" className="bg-slate-500 p-2 mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="mt-5 rounded-full bg-blue-600 font-bold text-xl p-2 text-white hover:bg-blue-500">Daftar</button>
            </form>
        </div>
    </div>
  )
}

export default Signup