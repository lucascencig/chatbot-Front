import React, { useState, useEffect, useRef } from 'react';

export const useScrollToBottom = () => {
  const messagesRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

}