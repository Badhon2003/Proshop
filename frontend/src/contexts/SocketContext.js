import React, { createContext, useContext, useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const SocketContext = createContext();

const SOCKET_SERVER_URL = 'http://localhost:4500';

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [updateKey, setUpdateKey] = useState('')
  const [updateTime, setUpdateTime] = useState('')
  // const [newReqCheck, setNewReqCheck] = useState(Math.random().toString());

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
    if (socket) {
      console.log('somthing is updating :) socket.connected: ', socket.connected)
      socket.on('update-client', (resMsg) => {
        console.log('context - resMsg msg: ', resMsg)
        setUpdateKey(resMsg)
        setUpdateTime((new Date()).toISOString())
      })
    }
  })

  const alertWithSocket = (reqMsg) => {
    // // console.log('reqMsg: ', reqMsg)
    // setNewReqCheck(Math.random().toString())
    socket.emit('update-custom', reqMsg)

  }
//  key={newReqCheck}
  return (
    <SocketContext.Provider value={{ alertWithSocket, updateKey, updateTime }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
