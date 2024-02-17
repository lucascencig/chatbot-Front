import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    username: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === '') {
      alert('Debes completar el campos de usuario');
    } else {
      // Guardar los datos en localStorage
      localStorage.setItem('userData', JSON.stringify(formData));
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className='fixed w-full flex justify-center items-center flex-col h-screen bg-[#008549bd] z-20'>
      <div className="w-96 bg-[#b3e041] rounded-3xl p-6 border-4 border-white ">
        <span className='text-center font-bold text-lg text-[#00854A] '>Para empezar, debes tener un nombre de usuario...</span>
        <div className="text-center font-extrabold text-2xl text-[#00854A] mt-10">¡Ingresa el que te más te defina!</div>
        <form onSubmit={handleSubmit} className="mt-10 w-80 bg-[#b3e041]">

          <input type="text"
            required
            className='w-80 bg-white border-0 p-4 rounded-lg mt-4 shadow-md border-transparent'
            name='username'
            id='username'
            placeholder='Ej: Pepito...'
            value={formData.username}
            onChange={handleChange}
          />

          <input
            className="block w-full font-bold bg-[#00854A] text-black py-3 mt-8 rounded-lg shadow-lg border-none hover:bg-[#29a76c] transition duration-100"
            type="submit"
            value="¡Comenzar!"
          />
        </form>

      </div>
    </div>
  );
};

export default LogginForm;