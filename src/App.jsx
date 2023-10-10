import { io } from 'socket.io-client';

import { FaAngleRight } from 'react-icons/fa6'
import './index.css'
import { useState, useEffect } from 'react'
import { Discuss } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';


const socket = io.connect('https://render-chat-back.onrender.com/')

function App() {
  const navigate = useNavigate()
  const [isConnected, setIsConnected] = useState(false)
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([])
  const [endSession, setEndSession] = useState(false)
  const [hasReloaded, setHasReloaded] = useState(false)

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));

    socket.on('chat_message', (data) => {
      setMessages(messages => [...messages, data])
    })

    return () => {
      socket.off('connect')
      socket.off('chat_message')

    }

  }, [])


  const sendMessage = () => {

    socket.emit('chat_message', {

      user: socket.id,
      message: newMessage,

    }
    );

    setNewMessage('')
  }

  const handleKeyDown = () => {
    socket.on('connect', () => setIsConnected(true));
  };


  const handleEndSession = () => {
    setEndSession(!endSession)

  }

  const handleEndSessionLogin = () => {
    navigate('/')
  }

  return (


    <div className=' '>

      {
        isConnected === true ?
          <div>
            <h2 className='bg-[#b3e041] h-12 flex items-center m-auto justify-center w-full text-center font-bold text-xl font-bold rounded-br-lg rounded-bl-lg text-[#5c7130]'>CONECTADO</h2>
          </div>
          :
          <div>
            <div className='bg-[#def0b99c] absolute top-50 left-50 -auto w-full h-screen'>
              <div className="loader">
                <span className="--i:1"></span>
                <span className="--i:2"></span>
                <span className="--i:3"></span>
                <span className="--i:4"></span>
                <span className="--i:5"></span>
                <span className="--i:6"></span>
                <span className="--i:7"></span>
                <span className="--i:8"></span>
                <span className="--i:9"></span>
                <span className="--i:10"></span>
                <span className="--i:11"></span>
                <span className="--i:12"></span>
                <span className="--i:13"></span>
                <span className="--i:14"></span>
                <span className="--i:15"></span>
                <span className="--i:16"></span>
                <span className="--i:17"></span>
                <span className="--i:18"></span>
                <span className="--i:19"></span>
                <span className="--i:20"></span>
              </div>
            </div>

            <h2 className='bg-[#ff0303] h-12 flex items-center m-auto justify-center w-full text-center font-bold text-xl rounded-br-lg rounded-bl-lg'> NO CONECTADO </h2>

          </div>
      }




      <div className='border-2 p-2 w-11/12 flex justify-center items-center m-auto mt-4 rounded-md'>
        <ul className='w-10/12 my-2 mx-auto flex flex-col gap-5 '>
          {messages.map((mensaje, index) => (
            <li
              key={index}
              className={`py-2 px-4 border-2 rounded-lg ${mensaje.user === socket.id
                ? 'bg-[#def0b9] border-none w-auto text-[#000000] text-right font-jakarta font-bold text-lg rounded-tr-sm ml-auto'
                : 'bg-[#b3e041] border-none w-auto text-[#000000] font-jakarta font-bold text-lg mr-auto rounded-tl-sm'
                }`}
            >

              <span className='text-sm'> {mensaje.user === socket.id ? 'Tú' : 'El/Ella'}: </span>
              <span className='font-bold text-[#000000] text-xl pl-2'>{mensaje.message}</span>


            </li>
          ))}
        </ul>
      </div>




      <div className='w-10/12 flex flex-row justify-around items-center m-auto'>



        <input onChange={e => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} value={newMessage} type="text" className='bg-[#fff] w-10/12 h-16 border-1 leading-3 my-4 p-2 border-2 border-[#666666] rounded-full mb-4 focus:outline-none active:border:[#3fdc92] font-bold text-lg pl-6 ml-auto' placeholder='Escribe tu mensaje...' />

        <button onClick={sendMessage} className='w-12 h-12 bg-[#00854A] text-[#fff] rounded-full flex justify-center items-center m-auto text-2xl hover:bg-[#29a76c] transition duration-100 ml-2'><FaAngleRight /></button>


      </div>
      <div className='flex justify-center items-center m-auto'>
        {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}
      </div>

      <div className='flex justify-center items-center m-auto mt-4'>
        <button onClick={handleEndSession} className='w-64 h-10 bg-[#00854A] rounded-full text-white font-bold hover:bg-[#29a76c] transition duration-100 ml-2'>Cerrar sesión</button>
      </div>

      {
        endSession === true ?
          <div className='absolute inset-0 h-40 w-96  rounded-xl bg-[#def0b9] border-2 border-[#c9c9c9] flex justify-center flex-col items-center m-auto p-4'>
            <p className='font-bold text-xl text-center w-10/12'>¿Estás seguro que quieres terminar la sesión?</p>
            <div className='flex justify-center items-center m-auto mt-4'>
              <button onClick={handleEndSessionLogin} className='w-24 h-10 bg-[#850000] rounded-full text-white font-bold hover:bg-[#a72929] transition duration-100 ml-2 mb-2 '>Si</button>
              <button onClick={handleEndSession} className='w-24 h-10 bg-[#00854A] rounded-full text-white font-bold hover:bg-[#29a76c] transition duration-100 ml-2 mb-2'>No</button>
            </div>

          </div>
          :
          null
      }
    </div>
  )

}

export default App