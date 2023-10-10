import React, { useState } from 'react'

const EndSession = () => {
  const [endSession, setEndSession] = useState(false)

  const handleEndSession = () => {
    setEndSession(!endSession)

  }
  return (
    <div>

      <div className='absolute inset-0 h-40 w-96  rounded-xl bg-[#def0b967] border-2 border-[#00854A] flex justify-center flex-col items-center m-auto p-4'>
        <p className='font-bold text-xl text-center w-10/12'>¿Estás seguro que quieres terminar la sesión?</p>
        <div className='flex justify-center items-center m-auto mt-4'>
          <button className='w-24 h-10 bg-[#850000] rounded-full text-white font-bold hover:bg-[#a72929] transition duration-100 ml-2 mb-2 '>Si</button>
          <button onClick={handleEndSession} className='w-24 h-10 bg-[#00854A] rounded-full text-white font-bold hover:bg-[#29a76c] transition duration-100 ml-2 mb-2'>No</button>
        </div>

      </div>



    </div>
  )
}

export default EndSession