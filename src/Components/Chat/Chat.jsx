import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSocket } from '../../Hooks/useSocket.jsx';
import { InputMessage } from '../Inputs/InputMessage.jsx';

const Chat = () => {
  const { socket, messages, sendMessage, } = useSocket();

  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');


  const timeString = `${formattedHours}:${formattedMinutes}`;

  return (
    <div>
      <div className='w-10/12 border-2 m-auto mt-4 rounded-xl'>
        <InfiniteScroll
          dataLength={messages.length}
          loader={<h4>Loading...</h4>}

          inverse={true}
        >
          <ul className='w-10/12 h-96 overflow-y-auto my-2 mx-auto flex flex-col gap-5'>
            {messages.map((mensaje, index) => (
              <li
                key={index}
                className={`border-2 rounded-lg ${mensaje.user === socket.id
                  ? 'bg-[#def0b9] border-none w-auto h-auto p-2 text-[#000000] text-right font-jakarta font-bold text-lg rounded-tr-sm rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px] px-6 ml-auto mr-2 flex items-center justify-baseline'
                  : 'bg-[#b3e041] border-none w-auto h-auto p-2 text-[#000000] font-jakarta font-bold text-lg mr-auto rounded-tl-sm rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] px-6 flex items-center justify-center'
                  }`}
              >
                <span className='text-sm relative top-[-3px]'>
                  {mensaje.user === socket.id ? 'Tú' : (mensaje.senderName || 'Invitado')}:
                </span>

                <span className='font-bold text-[#000000] relative top-[-5px] text-xl pl-2'>
                  {mensaje.message}
                </span>
                <br />
                <span className='text-[8px] relative top-3 left-2 text-slate-500'> {timeString}</span>


              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </div>
      <div>
        <InputMessage sendMessage={sendMessage} />
      </div>

    </div>
  );
};

export default Chat;