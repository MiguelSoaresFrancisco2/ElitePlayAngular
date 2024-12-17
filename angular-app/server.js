const express = require('express');
const path = require('path');

const app = express();

// Servir arquivos estáticos do Angular
app.use(express.static(path.join(__dirname, 'dist/angular-app')));

// Redirecionar qualquer rota para o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-app/index.html'));
});

// Configurar a porta
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
