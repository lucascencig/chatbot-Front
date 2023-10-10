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
    <div className='bg-[#def0b93c]'>
      <div className='bg-[#87CE1B] flex flex-col justify-center items-center font-bold pt-10 pb-4'>
        <h2 className='text-black text-3xl mb-4'>Bienvenido</h2>
        <h4 className='text-black text-lg'>Ingrese su nombre para empezar</h4>
      </div>

      <div className='flex flex-col justify-center items-center m-auto mt-8'>
        <h2 className='font-bold text-xl pb-4'>Inicia sesión con Google</h2>
        <input type="email" className='mb-4 w-64 h-8 rounded-full border-2 p-4 font-bold outline-[#00854A]' />
        <input type="password" className='mb-4 w-64 h-8 rounded-full border-2 p-4 font-bold ' />
      </div>
      <div className='flex flex-col justify-center items-center m-auto h-screen -mt-40'>
        <input
          onChange={handleName}
          value={userName}
          className='bg-[#ffffff] p-2 rounded-full mb-4 font-bold text-center'
          type="text"
          name=""
          id=""
          placeholder="Nombre"
        />
        <Link to={'/online-chat'}>
          <button
            className='bg-[#00854A] font-bold rounded-full text-white px-4 py-2  hover:bg-[#29a76c] transition duration-100'
          >
            Entrar
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Login
