import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { FaAngleRight } from 'react-icons/fa6';
import InfiniteScroll from 'react-infinite-scroll-component';

const socket = io.connect('https://render-chat-back.onrender.com/');

const Chat = () => {
  const messagesRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [endSession, setEndSession] = useState(false);
  const [scrollData, setScrollData] = useState(Array.from({ length: 10 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    const newScrollData = Array.from({ length: 10 });
    setScrollData(scrollData.concat(newScrollData));
    if (scrollData.length > 30) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));

    socket.on('chat_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('chat_message');
    }
  }, [messages]);


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  const sendMessage = () => {
    socket.emit('chat_message', {
      user: socket.id,
      message: newMessage,
    });
    setNewMessage('');
  };

  const handleEndSession = () => {
    setEndSession(!endSession);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <div className='w-10/12 border-2 m-auto mt-4 rounded-xl'>
        <InfiniteScroll
          dataLength={scrollData.length}
          next={fetchMoreData}
          hasMore={hasMore}
        >
          <ul
            ref={messagesRef}
            className='w-10/12 h-96 overflow-y-auto my-2 mx-auto flex flex-col gap-5'
          >
            {messages.map((mensaje, index) => (
              <li
                key={index}
                className={`border-2 rounded-lg ${mensaje.user === socket.id
                  ? 'bg-[#def0b9] border-none w-auto h-auto p-2 text-[#000000] text-right font-jakarta font-bold text-lg rounded-tr-sm rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px] px-6 ml-auto mr-2 flex items-center justify-baseline'
                  : 'bg-[#b3e041] border-none w-auto h-auto p-2 text-[#000000] font-jakarta font-bold text-lg mr-auto rounded-tl-sm rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] px-6 flex items-center justify-center'
                  }`}
              >
                <span className='text-sm'>{mensaje.user === socket.id ? 'Tú' : 'El/Ella'}:</span>
                <span className='font-bold text-[#000000] text-xl pl-2'>{mensaje.message}</span>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </div>
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
    </div>
  );
};

export default Chat;
