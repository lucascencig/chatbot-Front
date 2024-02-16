import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import { useSocket } from '../../Hooks/useSocket.jsx';
import '../../index.css';

export const InputMessage = () => {
  const { socket } = useSocket();
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    const senderName = JSON.parse(localStorage.getItem('userData')).username; // Obtener el nombre del remitente desde el localStorage
    socket.emit('chat_message', {
      user: socket.id,
      message: newMessage,
      senderName: senderName, // Agregar el nombre del remitente al objeto de mensaje
    });
    setNewMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className='w-10/12 flex flex-row justify-around items-center m-auto'>
      <input
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        value={newMessage}
        type="text"
        className='bg-[#fff] w-10/12 h-16 border-1 leading-3 my-4 p-2 border-2 border-[#666666] rounded-full mb-4 focus:outline-none active:border:[#3fdc92] font-bold text-lg pl-6 ml-auto'
        placeholder='Escribe tu mensaje...'
      />
      <button
        onClick={sendMessage}
        className='w-14 h-14 bg-[#00854A] text-[#fff] rounded-full flex justify-center items-center m-auto text-2xl hover.bg-[#29a76c] transition duration-100 ml-2'
      >
        <FaAngleRight />
      </button>
    </div>
  );
};