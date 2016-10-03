// Constantes
var BANCO_DE_DADOS = "crudTeste";
var ROUTER_PUBLIC = "/public";

// Declarando variáveis
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('crudTeste', ['crudTeste']);
var bodyParser = require('body-parser');

// Requisitando acesso a pasta public através do express
app.use(express.static(__dirname + ROUTER_PUBLIC));
app.use(bodyParser.json());


// Listando dados através de uma api que lista os dados em json
app.get('/crudTeste', function (req, res) {
  console.log('LOG: Requisição GET Recebida.');
  db.crudTeste.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

// Inserção de novos dados
app.post('/crudTeste', function (req, res) {
    console.log("LOG: Requisição POST Recebida.");
  db.crudTeste.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

// Rodar servidor
app.listen(3000);
console.log("Servidor está rodando na porta 3000.");
