import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function FormAddMurid() {
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('');
  const [jurusan, setJursan] = useState('');
  const [nis, setNis] = useState('');
  const [kartupelajar, setKartupelajar] = useState('');
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();

    const data = {
      nama,
      kelas,
      jurusan,
      nis,
      kartupelajar,
    }

    const refreshToken = Cookies.get('refreshToken')

    try {
      const logs = await axios.post('http://localhost:3000/murid/addData', data, {
        headers: {
          Authrorization: `Bearer ${refreshToken}`
        }
      })
      toast.success('berhasil daftar')
      navigate('/home')
      console.log(logs)
    } catch (error) {
      console.log(error);
      toast.error('MASUKA INPUTAN YANG BENAR!')
    }
  };


  return (
    <div className="container mx-auto mt-36 flex justify-center">
        <div className=" bg-slate-600 p-8 rounded-lg shadow-lg w-full">
          <form onSubmit={add} action="" className="flex flex-col">
            <label htmlFor="" className="text-white font-medium mb-2">Nama</label>
            <input type="text" className="bg-slate-500 p-2 mb-2" value={nama} onChange={(e) => setNama(e.target.value)}/>
            <label htmlFor="" className="text-white font-medium mb-2">KELAS</label>
            <input type="text" className="bg-slate-500 p-2 mb-2"  value={kelas} onChange={(e) => setKelas(e.target.value)}/>
            <label htmlFor="" className="text-white font-medium mb-2">JURUSAN</label>
            <input type="text" className="bg-slate-500 p-2 mb-2"  value={jurusan} onChange={(e) => setJursan(e.target.value)}/>
            <label htmlFor="" className="text-white font-medium mb-2">Nis</label>
            <input type="text" className="bg-slate-500 p-2 mb-2" value={nis} onChange={(e) => setNis(e.target.value)}/>
            <label htmlFor="" className="text-white mb-2">NISN</label>
            <input type="text" className="bg-slate-500 p-2 mb-2" value={kartupelajar} onChange={(e) => setKartupelajar(e.target.value)}/>
            <div className="flex justify-end mt-2">
              <button className="p-2 bg-slate-500 text-white rounded-lg mr-2 hover:bg-slate-400"><a href="/murid">KEMBALI</a></button>
              <button className="p-2 bg-slate-500 text-white rounded-lg hover:bg-slate-400">SUBMIT</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default FormAddMurid