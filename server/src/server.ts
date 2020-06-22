import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import knex from 'knex';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(3333);

// Rota = Endereço completo da requisição
//Recurso = QUal entidade estamos acessando do sistema

//GET: Buscar uma ou mais informações do back-end
//POST: Criar uma nova informação no back-end
//PUT: Atualizar uma informação existente no back-end
//DELETE: Remover uma informação do back-end

//POST: http://localhost:3333/users = Criar um usuário
//GET: http://localhost:333/users = Listar usuários
//GET: http://localhost:3333/users/5 = Buscar dados do usuário com ID 5

//Request Param: Parâmetros que são descritos na própria rota que identificam um recurso
//Query Param: Parâmetros que são descritos na própria rota geralmente opicionais para filtros, paginação
//Request Body: Parâmetros para criação/atualização de informalções

//SELECT * FROM USERS WHERE NAME = 'DIEGO'
// knex('users').where('name', 'diego').select('*')
