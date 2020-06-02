import express from 'express';

const app = express();


//REQUEST = DADOS ENVIADOS DO FRONT PARA O BACK
//RESPONSE = RESPOSTA DO BACK SOBRE A REQUISICAO FEITA
app.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    //JSON
    response.json([
        'Diego',
        'Cleiton',
        'Robson',
        'Thauã'
    ]);



});

app.listen(3333);