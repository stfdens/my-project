import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


function EditMurid() {
    const [nama, setNama] = useState('');
    const [jurusan, setJursan] = useState('');
    const [kelas, setKelas] = useState('');
    const [nis, setNis] = useState('');
    const [kartupelajar, setKartupelajar] = useState('');
    const navigate = useNavigate();
    const refreshToken = Cookies.get('refreshToken');

    const { id } = useParams();

    useEffect(() => {
        const getDataById = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/murid/getData/${id}`, {
                    headers: {
                        Authrorization: `Bearer ${refreshToken}`
                    }
                });
                setNama(response.data.data.nama)
                setJursan(response.data.data.jurusan)
                setKelas(response.data.data.kelas)
                setNis(response.data.data.nis)
                setKartupelajar(response.data.data.kartupelajar)                
            } catch (error) {
                console.log(error);
            }
        }

        getDataById()
    }, [id, refreshToken])

    const update = async (e) => {
        e.preventDefault();

        const data = {
            nama,
            jurusan,
            kelas,
            nis,
            kartupelajar,
        }

        try {
            await axios.put(`http://localhost:3000/murid/updateData/${id}`, data, {
                headers: {
                    Authrorization: `Bearer ${refreshToken}`
                }
            })
            toast.success('DATA BERHASIL DI UPDATE')
            navigate('/murid')
        } catch (error) {
            console.log(error);
        }
    }
    return (
     <div className="container mx-auto mt-16 flex justify-center">
        <div className=" bg-slate-600 p-8 rounded-lg shadow-lg w-full">
          <form onSubmit={update} action="" className="flex flex-col">
            <label htmlFor="" className="text-white font-medium mb-2" name>Nama</label>
            <input type="text" className="bg-slate-500 p-2 mb-2 text-bla" placeholder="" value={nama} onChange={(e) => setNama(e.target.value)}/>
            <label htmlFor="" className="text-white font-medium mb-2">JURUSAN</label>
            <select name="" id="" className="bg-slate-500 p-2 mb-2" value={jurusan} onChange={(e) => setJursan(e.target.value)}>
              <option value="">.........</option>
              <option value="ANALISIS KIMIA">ANALISIS KIMIA</option>
              <option value="REKAYASA PERANGKAT LUNAK">REKAYASA PERANGKAT LUNAK</option>
              <option value="TEKNIK KOMPUTER JARINGAN">TEKNIK KOMPUTER JARINGAN</option>
            </select>
            <label htmlFor="" className="text-white font-medium mb-2">KELAS</label>
            <input type="text" className="bg-slate-500 p-2 mb-2" placeholder="KELAS MENGGUNAKAN ROMAWI DAN SINGKATAN JURUSAN 2 [X TKJ 1]" value={kelas} onChange={(e) => setKelas(e.target.value)}/>
            <label htmlFor="" className="text-white font-medium mb-2">Nis</label>
            <input type="text" className="bg-slate-500 p-2 mb-2" value={nis} onChange={(e) => setNis(e.target.value)}/>
            <label htmlFor="" className="text-white mb-2">NISN</label>
            <input type="text" className="bg-slate-500 p-2 mb-2" value={kartupelajar} onChange={(e) => setKartupelajar(e.target.value)}/>
            <div className="flex justify-end mt-2">
              <button className="p-2 bg-slate-500 text-white rounded-lg mr-2 hover:bg-slate-400" onClick={() => navigate('/murid')}>KEMBALI</button>
              <button className="p-2 bg-slate-500 text-white rounded-lg hover:bg-slate-400" type="submit">UPDATE</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default EditMurid