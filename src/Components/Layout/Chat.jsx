import { io } from 'socket.io-client';

import { FaAngleRight } from 'react-icons/fa6'
import '../../index.css'
import { useState, useEffect } from 'react'


const socket = io.connect('http://127.0.0.1:5173/')

const Chat = () => {

  const [isConnected, setIsConnected] = useState(true)
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([])
  const [errorMessage, setErrorMessage] = useState('')


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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();

    }
  };

  return (

    <div className=' '>
      {
        isConnected === true ?
          <div>
            <h2 className='bg-green-300 w-full text-center font-bold text-xl font-bold'>CONECTADO</h2>
          </div>
          :
          <h2 className='bg-red-300 w-full text-center font-bold text-xl '> NO CONECTADO </h2>
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

              <span className='text-sm'>{mensaje.user.slice(12)}: </span>
              <span className='font-bold text-[#000000] text-xl pl-2'>{mensaje.message}</span>


            </li>
          ))}
        </ul>
      </div>




      <div className='w-10/12 flex flex-row justify-around items-center m-auto'>



        <input onChange={e => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} value={newMessage} type="text" className='bg-[#fff] w-10/12 h-16 border-1 leading-3 my-4 p-2 border-2 border-[#666666] rounded-full mb-4 focus:outline-none active:border:[#3fdc92] font-bold text-lg pl-6' placeholder='Escribe tu mensaje...' />

        <button onClick={sendMessage} className='w-12 h-12 bg-[#00854A] text-[#fff] rounded-full flex justify-center items-center m-auto text-2xl hover:bg-[#29a76c] transition duration-100 ml-2'><FaAngleRight /></button>


      </div>
      <div className='flex justify-center items-center m-auto'>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  )
}

export default Chat
