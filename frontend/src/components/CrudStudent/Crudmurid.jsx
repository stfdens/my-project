/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import Cookies from "js-cookie";
import { useEffect, useState } from "react"
import AddCrudMurid from "./AddCrudMurid";

function Crudmurid() {
  const [student, Setstudent] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const refreshToken = Cookies.get('refreshToken')

  const data = async () => {
    try {
        const response = await axios.get('http://localhost:3000/murid/getData', {
            headers: {
                Authrorization: `Bearer ${refreshToken}` 
            }
        });
        setDataFetched(true); // Set flag to true after data is fetched
        Setstudent(response.data.data);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    if (!dataFetched) {
      data()
    }
  }, [])

  return (
    <div className="container mx-auto mt-16 h-screen">
        <h1 className="text-center font-bold text-4xl">CRUD MURID</h1>
        <AddCrudMurid/>
        <div className="flex justify-center mt-10">
          <div className="max-h-96 overflow-y-auto">
              <table className="border-collapse border border-gray-400">
                <thead className="bg-slate-400">
                  <tr className="font-bold text-2xl">
                    <th className="p-2 border">NO</th>
                    <th className="p-2 border">NAMA</th>
                    <th className="p-2 border">KELAS</th>
                    <th className="p-2 border">JURUSAN</th>
                    <th className="p-2 border">NIS</th>
                    <th className="p-2 border">NISN</th>
                    <th className="p-2 border">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                {student.map((data, index) => (
                  <tr key={data.id}>
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{data.nama}</td>
                    <td className="p-2 border">{data.kelas}</td>
                    <td className="p-2 border">{data.jurusan}</td>
                    <td className="p-2 border">{data.nis}</td>
                    <td className="p-2 border">{data.kartupelajar}</td>
                    <td className="p-2 border">Edit / Delete</td>
                  </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
    </div>
  )
}

export default Crudmurid