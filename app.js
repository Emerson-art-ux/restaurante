const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// 1. Configura o servidor para servir arquivos da pasta 'public'
// Isso faz com que o CSS, imagens e HTMLs sejam encontrados automaticamente
app.use(express.static(path.join(__dirname, 'public')));

// 2. Rota Principal (Opcional)
// Se alguém acessar apenas 'seusite.onrender.com', será enviado para a mesa 1
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mesa.html'));
});

// 3. Lógica do Socket.io (Comunicação em tempo real)
io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

    // Escuta quando uma mesa envia um pedido
    socket.on('fazer_pedido', (dados) => {
        console.log('Pedido recebido:', dados);
        // Repassa o pedido para o painel da cozinha
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