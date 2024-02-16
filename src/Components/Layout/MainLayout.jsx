import React, { useState } from 'react';
import '../../index.css'
import Chat from '../Chat/Chat';
import Loader from '../Loader/Loader';
import { Footer } from '../Footer/Footer';
import logo from '../../assets/logo.png';
import { useSocket } from '../../Hooks/useSocket';
import { useNavigate } from 'react-router-dom';
import LogginForm from '../Login/Form/LogginForm';

const MainLayout = () => {
  const navigate = useNavigate();
  const { connected } = useSocket();
  const [endSession, setEndSession] = useState(false);
  const username = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : null;

  const handleEndSession = async () => {
    setEndSession(true);
    window.localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div>
      <div className=''>
        {username ? null : <LogginForm />}
      </div>
      <div className=''>
        {connected === true ? (
          <div>
            <div className='bg-[#b3e041]'>
              <img
                src={logo}
                alt="logo"
                className='rounded-xl pt-2 pb-2 flex justify-center items-center m-auto w-18 h-20'
              />
            </div>
            <h2 className='bg-[#b3e041] h-12 flex items-center m-auto justify-center w-full text-center font-bold text-xl font-bold rounded-br-lg rounded-bl-lg text-[#5c7130]'>
              {username ? `CONECTADO COMO "${username}"` : 'INGRESA UN NOMBRE DE USUARIO'}
            </h2>
          </div>
        ) : (
          <div>
            <Loader />
            <div className='bg-[#b3e041]'>
              <img
                src={logo}
                alt="logo"
                className='rounded-xl pt-2 pb-2 flex justify-center items-center m-auto w-18 h-20'
              />
            </div>
            <h2 className='bg-[#ff0303] h-12 flex items-center m-auto justify-center w-full text-center font-bold text-xl rounded-br-lg rounded-bl-lg'>
              CARGANDO...
            </h2>
          </div>
        )}

        {endSession === true ? (
          <div className='blur-md bg-[#fffdfd0] h-screen'>
            <Chat />
            <div className='flex justify-center items-center m-auto '>
              <button
                onClick={handleEndSession}
                className='w-64 h-10 bg-[#00854A] rounded-full text-white font-bold hover:bg-[#29a76c] transition duration-100 ml-2'
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Chat />
            <div className='flex justify-center items-center m-auto '>
              <button
                onClick={handleEndSession}
                className='w-64 h-10 bg-[#00854A] rounded-full text-white font-bold hover-bg-[#29a76c] transition duration-100 ml-2'
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

        {endSession === true ? (
          <div className='absolute inset-0 h-40 w-96 rounded-xl bg-[#e3edcd7e] border-2 border-[#00854A] flex justify-center flex-col items-center m-auto p-4'>
            <p className='font-bold text-xl text-center w-10/12'>
              ¿Estás seguro que quieres terminar la sesión?
            </p>
            <div className='flex justify-center items-center m-auto mt-4'>
              <button
                className='w-24 h-10 bg-[#893535] rounded-full text-white font-bold hover-bg-[#a72929] transition duration-100 ml-2 mb-2'
              >
                Si
              </button>
              <button
                className='w-24 h-10 bg-[#00854A] rounded-full text-white font-bold hover-bg-[#29a76c] transition duration-100 ml-2 mb-2'
              >
                No
              </button>
            </div>
          </div>
        ) : null}

        <Footer />
      </div>
    </div>
  )
}

export default MainLayout;
