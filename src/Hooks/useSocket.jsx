import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

const socket = io.connect('https://chat-online-backfix.onrender.com');

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    localStorage.setItem('username', 'NombreDeUsuario');
    socket.on('connect', () => setIsConnected(true));

    socket.on('chat_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      saveMessageToCache(data); // Guardar mensaje en el cache al recibirlo
    });

    // Cargar mensajes del cache al iniciar la aplicación
    const cachedMessages = JSON.parse(localStorage.getItem('cachedMessages')) || [];
    setMessages(cachedMessages);

    return () => {
      socket.off('connect');
      socket.off('chat_message');
    };
  }, []);

  const sendMessage = (message) => {
    const username = localStorage.getItem('username');
    socket.emit('chat_message', { message, username });
  };

  const saveMessageToCache = (message) => {
    const cachedMessages = JSON.parse(localStorage.getItem('cachedMessages')) || [];
    const updatedMessages = [...cachedMessages, message];
    localStorage.setItem('cachedMessages', JSON.stringify(updatedMessages));
  };

  return { connected: isConnected, messages, socket, sendMessage };
};