import React, { createContext, useContext, useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const SocketContext = createContext();

const SOCKET_SERVER_URL = 'http://localhost:4500';

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [updateKey, setUpdateKey] = useState('')
  const [updateTime, setUpdateTime] = useState('')
  const [listenerAdded, setListenderAdded] = useState(false);

  useEffect(() => {
    const newSocket = socketIOClient(SOCKET_SERVER_URL);

    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Other event listeners and setup can be added here

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && !listenerAdded) {
      setListenderAdded(true)
      socket.on('update-client', (resMsg) => {
        setUpdateKey(resMsg)
        setUpdateTime((new Date()).toISOString())
      })
    }
  }, [socket, listenerAdded])

  const alertWithSocket = (reqMsg) => {
    socket.emit('update-custom', reqMsg)
  }

  return (
    <SocketContext.Provider value={{ alertWithSocket, updateKey, updateTime }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
