import { io } from 'socket.io-client';
import { useState, useEffect } from 'react'

const socket = io.connect('https://render-chat-back.onrender.com/')

export const useSocket = () => {

  const [isConnected, setIsConnected] = useState(false)

  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));

    socket.on('chat_message', (data) => {
      setMessages(messages => [...messages, data])
    })

    return () => {
      socket.off('connect')
      socket.off('chat_message')

    }
  }, [messages])

  return { connected: isConnected, messages, socket };
}