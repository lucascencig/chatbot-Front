import React from 'react'

import { FaUser } from 'react-icons/fa6';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { Link } from "react-router-dom"


export const ButtonLoggin = () => {
  // const navigate = useNavigate()
  return (
    <div className='flex justify-center'>
      <Link to={'/loggin'}>
        <button

          className='w-24 h-10 bg-[#00854A] flex justify-center items-center rounded-full text-white font-bold hover:bg-[#29a76c] transition duration-100 ml-2'
        >
          <FaUser />
          <FaArrowRightToBracket />
        </button>
      </Link>
    </div>
  )
}
