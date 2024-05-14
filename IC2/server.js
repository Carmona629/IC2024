const http = require('http');
const fs = require('fs');
const path = require('path');

// Função para servir arquivos estáticos
function servirArquivo(req, res) {
  // Verifica se o caminho é "/pasta"
  if (req.url === '/pasta') {
    // Define o arquivo como "pasta.html"
    let arquivo = path.join(__dirname, 'pasta.html');

    // Verifica se o arquivo existe
    fs.exists(arquivo, (existe) => {
      if (existe) {
        // Se o arquivo existe, lê seu conteúdo e o envia como resposta
        fs.readFile(arquivo, (err, data) => {
          if (err) {
            // Se houver um erro ao ler o arquivo, retorna um código de status 500 (Internal Server Error)
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Erro interno do servidor');
          } else {
            // Define o cabeçalho Content-Type como "text/html"
            res.writeHead(200, {'Content-Type': 'text/html'});
            // Envia o conteúdo do arquivo como resposta
            res.end(data);
          }
        });
      } else {
        // Se o arquivo não existe, retorna um código de status 404 (Not Found)
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Página não encontrada');
      }
    });
  } else {
    // Se o caminho não for "/pasta", continua com a lógica existente para servir arquivos estáticos
    let recurso = req.url === '/' ? 'mainPage.html' : req.url;
    let arquivo = path.join(__dirname, recurso); // Alterei aqui para considerar a pasta 'public'
    let extensao = path.extname(arquivo);

    // Verifica se o arquivo existe
    fs.exists(arquivo, (existe) => {
      if (existe) {
        // Se o arquivo existe, lê seu conteúdo e o envia como resposta
        fs.readFile(arquivo, (err, data) => {
          if (err) {
            // Se houver um erro ao ler o arquivo, retorna um código de status 500 (Internal Server Error)
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Erro interno do servidor');
          } else {
            // Mapeamento de tipos MIME para algumas extensões de arquivo comuns
            const tiposMIME = {
              '.html': 'text/html',
              '.css': 'text/css',
              '.js': 'text/javascript',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.gif': 'image/gif'
              // Adicione mais extensões conforme necessário
            };

            // Determina o tipo MIME do arquivo com base na sua extensão
            let tipoMIME = tiposMIME[extensao] || 'application/octet-stream';

            // Define o cabeçalho Content-Type com o tipo MIME correspondente
            res.writeHead(200, {'Content-Type': tipoMIME});
            // Envia o conteúdo do arquivo como resposta
            res.end(data);
          }
        });
      } else {
        // Se o arquivo não existe, retorna um código de status 404 (Not Found)
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Página não encontrada');
      }
    });
  }
}

// Criando o servidor
const servidor = http.createServer(servirArquivo);

// Definindo a porta em que o servidor irá escutar
const porta = 8082;

// Iniciando o servidor e fazendo-o escutar na porta especificada
servidor.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}/`);
});

