import React, { useEffect, useState } from 'react';
import '../../index.css'
import Chat from '../Chat/Chat';
import Loader from '../Loader/Loader';
import { Footer } from '../Footer/Footer';
import logo from '../../assets/logo2.png';
import { useSocket } from '../../Hooks/useSocket';
import { useNavigate } from 'react-router-dom';
import LogginForm from '../Login/Form/LogginForm';
import { IoMdSettings } from "react-icons/io";
<IoMdSettings />

const MainLayout = () => {
  const navigate = useNavigate();
  const { connected } = useSocket();
  const [openModal, setOpenModal] = useState(false)
  const [deletechat, setDeleteChat] = useState(false)
  const [endSession, setEndSession] = useState(false);
  const [settings, setSettings] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const username = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : null;

  const handleSettingsChange = () => {
    setSettings(!settings)
  }

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  const handleHistorychat = () => {
    setDeleteChat(true)
    localStorage.removeItem('cachedMessages')
    window.location.reload()
  }

  const handleEndSession = () => {
    setEndSession(true);
    window.localStorage.removeItem('userData');
    window.location.reload()
  };

  const doNothing = () => {
    setOpenModal(false)
  }
  return (
    <div className={`h-screen ${darkMode ? 'bg-gray-900 text-slate-800 h-screen' : 'bg-white text-black'}`}>
      <div className=''>
        {username ? null : <LogginForm />}
      </div>
      <div className=''>
        {connected === true ? (
          <div>
            <div className='bg-[#008549]'>
              <img
                src={logo}
                alt="logo"
                className='rounded-xl pt-2 pb-2 flex justify-center items-center m-auto w-18 h-20'
              />
            </div>
            <h2 className='bg-[#008549] h-12 flex items-center m-auto justify-center w-full text-center font-bold text-xl rounded-br-lg rounded-bl-lg text-[#fff]'>
              {username ? `CONECTADO COMO "${username}"` : 'NO CONECTADO'}
            </h2>
            <div className='absolute text-[#b3e041] text-6xl top-4 right-4'>
              <button onClick={handleSettingsChange} className='buttonsettings' ><IoMdSettings /></button>
            </div>
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

        {
          settings === true ?
            <div className="w-40 h-52 mb-2 flex justify-center items-center m-auto transition duration-200 translate-[-100%]">
              <ul>
                <li><button onClick={handleOpenModal} className='bg-[#008549] text-white font-bold rounded-full w-72 h-12 mt-5 mb-5 flex justify-center flex-col items-center m-auto p-4 hover:bg-[#255c43] duration-200'>Cerrar sesión</button></li>
                <li><button onClick={handleHistorychat} className='bg-[#008549] text-white font-bold rounded-full w-72 h-12 mt-5 mb-5 flex justify-center flex-col items-center m-auto p-4 hover:bg-[#255c43] duration-200'>Borrar historial</button></li>

                {
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`bg-[#008549] text-white font-bold rounded-full w-72 h-12 mt-5 mb-5 flex justify-center flex-col items-center m-auto p-4 hover:bg-[#255c43] duration-200 ${darkMode ? 'bg-gray-800' : 'bg-gray-500'}`}
                  >
                    {darkMode ? 'Modo Claro 🌕' : 'Modo Oscuro 🌑'}
                  </button>
                }
              </ul>
            </div>
            :
            null
        }
        <Chat />



        {openModal === true ? (
          <div className='fixed  inset-0 h-40 w-96 rounded-xl bg-[#def0b9] border-2 border-[#00854A] flex justify-center flex-col items-center m-auto p-4'>
            <p className='font-bold text-xl text-center w-10/12'>
              ¿Estás seguro que quieres terminar la sesión?
            </p>
            <div className='flex justify-center items-center m-auto mt-4'>
              <button
                onClick={handleEndSession}
                className='w-24 h-10 bg-[#893535] rounded-full text-white font-bold hover:bg-[#ce1a1a] ]transition duration-100 ml-2 mb-2'
              >


                Si
              </button>
              <button
                onClick={doNothing}
                className='w-24 h-10 bg-[#00854A] rounded-full text-white font-bold hover:bg-[#29a76c] transition duration-100 ml-2 mb-2'
              >
                No
              </button>
            </div>
          </div>
        ) : null}


        <div className='mt-10'>

          <Footer />
        </div>
      </div>
    </div >
  )
}

export default MainLayout;
