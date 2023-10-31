import React, { useState } from 'react';

// import { FaAngleRight } from 'react-icons/fa6';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useFetchData } from '../../Hooks/useFetchData.jsx';
import { useScrollToBottom } from '../../Hooks/useScrollToBottom.jsx';
import { useSocket } from '../../Hooks/useSocket.jsx';
import { InputMessage } from '../Inputs/InputMessage.jsx';


const Chat = () => {
  const { connected, messages, socket } = useSocket();

  const [endSession, setEndSession] = useState(false);




  return (
    <div>
      <div className='w-10/12 border-2 m-auto mt-4 rounded-xl'>
        <InfiniteScroll
          dataLength={useFetchData}
          next={useFetchData}
          hasMore={useFetchData}
        >
          <ul
            ref={scroll}
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
      <div>
        <InputMessage />
      </div>
    </div>
  );
};

export default Chat;
