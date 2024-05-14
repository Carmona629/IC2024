const http = require('http');
const fs = require('fs');
const path = require('path');

// Cria um servidor HTTP
const server = http.createServer((req, res) => {
  // Determina o caminho do arquivo solicitado
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './mainPage.html'; // Altera para "mainPage.html" se nenhum arquivo for especificado
  } else if (filePath === './pasta') {
    filePath = './teste.html'; // Altera para "pasta.html" se a rota for "/pasta"
  }

  // Determina o tipo de conteúdo do arquivo
  const contentType = getContentType(filePath);

  // Lê o arquivo do sistema de arquivos
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Se o arquivo não for encontrado, retorna um erro 404
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
    } else {
      // Se o arquivo for encontrado, envia-o como resposta
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Define a porta em que o servidor deve escutar as solicitações
const PORT = process.env.PORT || 8082;

// Inicia o servidor e faz ele escutar na porta especificada
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});

// Função auxiliar para determinar o tipo de conteúdo do arquivo
function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}

