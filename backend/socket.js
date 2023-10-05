import { Server as SocketServer } from 'socket.io'



const initializeSocketIO = (server) => {
  const io = new SocketServer(server, {
    // path: '/socket.io/',
    pingTimeout: 60000,
    transports: ['polling', 'websocket'],
    allowEIO3: true,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      // credentials: true
    }
  })

  // console.log('io: ', io)

  io.on("connection", (socket) => {
    const clientIpAddress = socket.request.connection.remoteAddress;
    const clientUserAgent = socket.request.headers['user-agent'];
  
    console.log(`\nConnected Client IP Address: ${clientIpAddress}`);
    console.log(`Connected Client User Agent: ${clientUserAgent}\n`)


    socket.join('common')
      

    // })
    socket.on('update-custom', (newMsg) => {
      console.log('update message: ', newMsg)
      socket.in('common').emit('update-client', newMsg)
    })

    socket.on('disconnect', () => {
      console.log('User disconnected');
    })
    
    socket.on('error', (err) => {
      console.log('Socket error:', err);
    });
  })
  
}

export default initializeSocketIO