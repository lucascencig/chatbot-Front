import React, { useState } from 'react'
import '../../../index.css'
import { useNavigate } from 'react-router-dom'
const LogginForm = () => {

  const navigate = useNavigate()

  const [validate, setValidate] = useState({
    email: 'prueba@prueba.com',
    password: '123'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate.email === '' && validate.password === '') {
      alert('Debes completar los campos')
    }
    else {
      navigate('/')
    }
  }

  return (
    <div className='bg-[#b3e041] w-full h-screen'>


      <div className=" max-w-350 bg-gradient-to-b from-white to-true-gray-200 rounded-3xl p-6 border-4 border-white shadow-xl ">
        <div className="text-center font-extrabold text-3xl text-[#00854A] mt-10">Sign In</div>
        <form action="" className="mt-10">
          <input required="" className="w-full bg-white border-0 p-4 rounded-lg mt-4 shadow-md border-transparent" type="email" name="email" id="email" placeholder="E-mail" />
          <input required="" className="w-full bg-white border-0 p-4 rounded-lg mt-4 shadow-md border-transparent" type="password" name="password" id="password" placeholder="Password" />
          <span className="text-sm text-blue-500 no-underline"><a href="#">Forgot Password ?</a></span>
          <input onClick={handleSubmit} className="block w-full font-bold bg-[#00854A] text-black py-3 mt-20 mx-auto rounded-lg shadow-lg border-none  hover:bg-[#29a76c] transition duration-100 ml-2" type="submit" value="Sign In" />

        </form>
        <div className='flex justify-center py-4'>
          <span ><a className='text-center text-[#00854A] font-bold' href="#">Learn user licence agreement</a></span>
        </div>


      </div>
    </div>
  )
}

export default LogginForm