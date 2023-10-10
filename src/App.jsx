import { io } from 'socket.io-client';
import Mensaje from './Components/Mensajes/Mensaje';
import { FaAngleRight } from 'react-icons/fa6'
import './index.css'
import { useState, useEffect } from 'react'
import classnames from 'classnames';

const socket = io.connect('http://localhost:8084')

function App() {

  const [isConnected, setIsConnected] = useState(false)
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([])

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
      message: newMessage
    });
    setNewMessage('.')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (

    <div className=' '>
      {
        isConnected === true ?
          <h2 className='bg-green-300 w-full text-center font-bold text-xl'> CONECTADO </h2>
          :
          <h2 className='bg-red-300 w-full text-center font-bold text-xl'> NO CONECTADO </h2>
      }




      <div>
        <ul className='w-10/12 my-2 mx-auto flex flex-col gap-5'>
          {messages.map((mensaje, index) => (
            <li
              key={index}
              className={`py-2 px-4 border-2 rounded-lg ${mensaje.user === socket.id
                ? 'bg-green-500 text-white text-right'
                : 'bg-blue-500 text-white'
                }`}
            >
              {mensaje.user}: {mensaje.message}
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-col justify-center items-center m-auto'>
        <textarea onChange={e => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} type="text" className='bg-[#cdcbcb] w-96 leading-3 p-2 border-1 border-[#000000] rounded-xl outline resize-none mb-4' />
        <button onClick={sendMessage} className='w-12 h-12 bg-[#3fdc92] text-[#fff] rounded-full flex justify-center items-center m-auto text-2xl'><FaAngleRight /></button>
      </div>
    </div>
  )
}

export default App
