const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Faz o servidor enxergar os arquivos dentro da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal para teste
app.get('/', (req, res) => {
    res.send('<h1>Servidor Online!</h1><p>Acesse <a href="/painel.html">/painel.html</a></p>');
});

io.on('connection', (socket) => {
    socket.on('fazer_pedido', (dados) => {
        // Repassa o pedido para todos que estiverem com o painel aberto
        io.emit('receber_pedido', dados);
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