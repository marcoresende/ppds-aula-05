app.controller('AdicionarCtrl', function($scope, $location, $http)
{
   $scope.activetab = $location.path();
   $scope.livro = [];

   // Adicionar livro ao banco
   $scope.adicionar = function() {
       $scope.livro.push({'isbn' : $scope.livro.isbn,'nome' : $scope.livro.nome, 'ano': $scope.livro.ano,
      'autor':$scope.livro.autor, 'editora' : $scope.livro.editora, 'critica' : $scope.livro.critica});

       if($scope.verificaCamposPreenchidos($scope.livro)) {
       $http.post('/crudTeste', $scope.livro).success(function(response) {
       console.log("LOG: Livro Adicionado.");
       Materialize.toast('Livro adicionado com sucesso!', 4000);
       $scope.limparCampos();
     }).error(function () {
       console.log("LOG: Error ao tentar gravar no banco!");
       Materialize.toast('Ocorreu um erro!', 4000);
       });;
     } else {
       Materialize.toast('Favor preencher os campos corretamente!', 4000);
       }
   };


   $scope.verificaCamposPreenchidos = function(livro){
     console.log("LOG: Verificando campos preenchidos.");
    var isExistente = true;

    if(livro.isbn == "" || livro.isbn == null) {
    isExistente = false;
    }

    if(livro.nome == "" || livro.nome == null) {
    isExistente = false;
    }

    if(livro.ano == "" || livro.ano == null) {
    isExistente = false;
    }

    if(livro.autor == "" || livro.autor == null) {
    isExistente = false;
    }

    if(livro.editora == "" || livro.editora == null) {
    isExistente = false;
    }

    if(livro.critica == "" || livro.critica == null) {
    isExistente = false;
    }

   return isExistente;
 };

 $scope.limparCampos = function(){
   $scope.livro.nome = null;
   $scope.livro.ano = null;
   $scope.livro.autor = null;
   $scope.livro.editora = null;
   $scope.livro.critica = null;
 };


});

app.controller('ListaCtrl', function($scope, $location, $http)
{
   $scope.activetab = $location.path();
   $scope.livros = [];

   $scope.init = function() {
   $http.get('/crudTeste').success (function(data){
     $scope.livros = data;
   }).error(function () {
     console.log("LOG: Livro não encontrado.");
     alert("Livro não existente. Tente Novamente!");
     });
 };
});

app.controller('SobreCtrl', function($scope, $location, $http)
{
   $scope.activetab = $location.path();
});
