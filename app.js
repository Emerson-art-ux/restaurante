const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*", // Permite que qualquer dispositivo (celular/PC) acesse
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

   
    socket.on('fazer_pedido', (dados) => {
        console.log('Pedido recebido:', dados);
        
        io.emit('receber_pedido', dados);
    });

    socket.on('disconnect', () => {
        console.log('Um usuário se desconectou');
    });
});
const PORT = process.env.PORT || 3000;

http.listen(PORT, '0.0.0.0', () => {
    console.log('------------------------------------------');
    console.log(`PAINEL: http://localhost:${PORT}/painel.html`);
    console.log(`MESA: http://localhost:${PORT}/mesa.html?n=1`);
     console.log(`MESA: http://localhost:${PORT}/mesa.html?n=2`);
    console.log('------------------------------------------');
});
