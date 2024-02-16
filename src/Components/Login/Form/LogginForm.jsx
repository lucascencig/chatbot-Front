import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
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
    if (formData.email === '' || formData.password === '') {
      alert('Debes completar los campos');
    } else {
      // Guardar los datos en localStorage
      localStorage.setItem('userData', JSON.stringify(formData));
      navigate('/chat');
      window.location.reload();
    }
  };

  return (
    <div className='flex justify-center items-center flex-col h-screen bg-[#b3e04159]'>
      <div className="max-w-350 bg-[#b3e041] rounded-3xl p-6 border-4 border-white shadow-xl">
        <div className="text-center font-extrabold text-3xl text-[#00854A] mt-10">Sign In</div>
        <form onSubmit={handleSubmit} className="mt-10 w-96 bg-[#b3e041]">
          <input
            required
            className="w-full bg-white border-0 p-4 rounded-lg mt-4 shadow-md border-transparent"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <input type="text"
            required
            className='w-full bg-white border-0 p-4 rounded-lg mt-4 shadow-md border-transparent'
            name='username'
            id='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
          />
          <input
            required
            className="w-full bg-white border-0 p-4 rounded-lg mt-4 shadow-md border-transparent"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="text-sm text-blue-500 no-underline"><a href="#">Forgot Password ?</a></span>
          <input
            className="block w-full font-bold bg-[#00854A] text-black py-3 mt-8 rounded-lg shadow-lg border-none hover:bg-[#29a76c] transition duration-100"
            type="submit"
            value="Sign In"
          />
        </form>
        <div className='flex justify-center py-4'>
          <span><a className='text-center text-[#00854A] font-bold' href="#">Learn user licence agreement</a></span>
        </div>
      </div>
    </div>
  );
};

export default LogginForm;
