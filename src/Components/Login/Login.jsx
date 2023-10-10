import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../index.css'

const Login = () => {
  const [userName, setUserName] = useState('')

  const handleName = (e) => {
    const newName = e.target.value; // Obtén el nuevo nombre del evento
    setUserName(newName); // Actualiza el estado con el nuevo nombre
    localStorage.setItem('userName', newName); // Guarda el nuevo nombre en el localStorage
  }

  return (
    <div className=''>
      <div className='bg-gradient-to-r from-[#87CE1B] via-[#64B428] to-[#269900]  flex flex-col justify-center items-center font-bold pt-10 pb-4'>
        <h2 className='text-black text-3xl mb-4'>Bienvenido</h2>
        <h4 className='text-black text-lg'>Ingrese su nombre para empezar</h4>
      </div>

      <div className='flex flex-col justify-center items-center h-screen pt-10'>
        <input
          onChange={handleName}
          value={userName}
          className='bg-[#c9c9c9] p-2 rounded-md mb-4'
          type="text"
          name=""
          id=""
          placeholder="Nombre"
        />
        <Link to={'/online-chat'}>
          <button
            className='bg-[#3fdc92] text-white px-4 py-2 rounded-md hover:bg-[#29a76c] transition duration-100'
          >
            Entrar
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Login
