# ConnectLab-API🎮🔌

Este projeto foi desenvolvido no final do módulo 2 da devinHouse🚸, onde fomos desafiados a criar uma API em Nest.js💻 para manipular dispositivos IoT📱. A API ainda não foi integrada ao front-end🛠️, mas está pronta para uso após alguns ajustes finais.

Link para o projeto front-end:

- [Vídeo demonstração](https://youtu.be/fGDxn27uRqU)🚀
- [Site](https://connect-lab20.netlify.app)

## Tabela de Conteúdos

- [🛠️ Tecnologias](##Tecnologias)
- [🚀 Rodando Localmente](##Rodando_localmente)
- [📜 Endpoints](##Endpoints)
- [💡 Aprendizados](##Aprendizados)
- [📝 Mensagem Final](##Mensagem_Final)
- [🔒 Licença](##Licensas)

## Tecnologias:

- 💻 Node;
- 🔥 Nest.js;
- 🗄️ Typeorm;
- 🌱 Seed;
- 🔑 JWT;
- 🔒 Bcrypt
- 📜 Class-validator;
- 🔄 Class-transformer

## Rodando Localmente 🚀

### Clone o projeto 📂

```bash
  git clone https://link-para-o-projeto

```
## Configurando DB 🗄️
```bash
  Instale o Postgres e configure seguindo o arquivo ".env.example" como referência. 
  Este arquivo está na raiz do projeto.

```

### Configurações para Iniciar 🛠️

```bash
# instalar o node (caso não tenha)
$ npm i node

# instalando o Nest (caso não tenha)
$ npm i -g @nestjs/cli

# install dependencies
$ npm install

# run the migrations
$ npm run migration:run

# run the seed (este comando irá popular o banco de dados com devices)
$ npm run seed
```

### Iniciando o projeto 🏃‍♂️

```bash
# watch mode
$ npm run start:dev
  
  ```


## Endpoints 📜

### Arquivo com todos os endpoints:

- Há uma pasta chamada thunder_client na raiz, nesta há um arquivo com todos os endpoints para serem importados na extensão thunder client do vscode caso considere interessante 💻


### Rota Auth 🔐: Cadastrar Usuário:

```
POST: http://localhost:3000/auth/register

Body: {
  "fullName": "Neo",
  "email": "neo@gmail.com",
  "password": "SolAmarelo1!",
  "confirmPassword": "SolAmarelo1!",
  "photoUrl": "",
  "role": "admin",
  "phone": "38312628",
  "userAddress": {
    "zipCode": "37270000",
    "street": "Rua teste",
    "number": 13,
    "neighborhood": "centro",
    "city": "Cidade teste",
    "state": "MG",
    "complement": ""
  }
}

```

**Resultado:**

```
{
  "message": "Sucesso"
}
```

### Rota Auth 🔐 -- Efetuar Login:

```
POST: http://localhost:3000/auth/login

Body: {
  "email": "neo@gmail.com",
  "password": "SolAmarelo1!"
}

```

**Resultado:**

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": 10,
    "fullName": "Neo",
    "photoUrl": "https://cdn-icons-png.flaticon.com/512/149/149071.png?w=826&t=st=1672968367~exp=1672968967~hmac=91cb309ab22f9ca5bc79c41328b036cc7d03703c714fde61f117ce1a4cdd0693",
    "email": "neo@gmail.com",
    "phone": "38312628",
    "createdAt": "2023-01-15T22:59:34.037Z",
    "updatedAt": "2023-01-15T22:59:34.037Z",
    "role": "admin",
    "userAddress": {
      "_id": 10,
      "zipCode": "37270000",
      "street": "Rua teste",
      "number": 13,
      "neighborhood": "centro",
      "city": "Cidade teste",
      "state": "MG",
      "complement": ""
    }
  }
}

```
### Rota Auth 🔐 -- Trocar Senha:

```
PATCH: http://localhost:3000/auth/changepassword
Headers: {
	"Authorization": "Bearer token"
}

Body: {
{
  "email": "neo@gmail.com",
  "oldPassword": "LuaAmarelo1!",
  "newPassword" : "SolAmarelo1!",
  "newPasswordConfirm" : "SolAmarelo1!"
}
}

```

**Resultado:**

```
Senha alterada com sucesso
```


### Rota Users 🙋‍♂️ -- Buscar um usuário:

```
GET: http://localhost:3000/users
Headers: {
	"Authorization": "Bearer token"
}


```

**Resultado:**

```
{
  "_id": 10,
  "fullName": "Neo",
  "photoUrl": "https://cdn-icons-png.flaticon.com/512/149/149071.png?w=826&t=st=1672968367~exp=1672968967~hmac=91cb309ab22f9ca5bc79c41328b036cc7d03703c714fde61f117ce1a4cdd0693",
  "email": "neo@gmail.com",
  "phone": "38312628",
  "createdAt": "2023-01-15T22:59:34.037Z",
  "updatedAt": "2023-01-15T22:59:34.037Z",
  "role": "admin",
  "userAddress": {
    "_id": 10,
    "zipCode": "37270000",
    "street": "Rua teste",
    "number": 13,
    "neighborhood": "centro",
    "city": "Cidade teste",
    "state": "MG",
    "complement": ""
  }
}
```

### Rota Users 🙋‍♂️ -- Atualizar um usuário:

```
PUT: http://localhost:3000/users
Headers: {
	"Authorization": "Bearer token"
}

Body: {
  "fullName": "Neo?",
  "email": "neo@gmail.com",
  "password": "LuaAmarelo1!",
  "confirmPassword": "LuaAmarelo1!",
  "phone": "38312628",
  "photoUrl": "",
  "role": "client",
  "userAddress": {
    "zipCode": "37270000",
    "street": "Rua teste",
    "number": 12,
    "neighborhood": "centro",
    "city": "Cidade teste",
    "state": "MG",
    "complement": ""
  }
}

```

**Resultado:**

```
{
  "_id": 10,
  "fullName": "Neo?",
  "photoUrl": "https://cdn-icons-png.flaticon.com/512/149/149071.png?w=826&t=st=1672968367~exp=1672968967~hmac=91cb309ab22f9ca5bc79c41328b036cc7d03703c714fde61f117ce1a4cdd0693",
  "email": "neo@gmail.com",
  "phone": "38312628",
  "createdAt": "2023-01-15T22:59:34.037Z",
  "updatedAt": "2023-01-15T23:14:18.317Z",
  "role": "client",
  "userAddress": {
    "_id": 10,
    "zipCode": "37270000",
    "street": "Rua teste",
    "number": 12,
    "neighborhood": "centro",
    "city": "Cidade teste",
    "state": "MG",
    "complement": ""
  }
}
```

### Rota Users 🙋‍♂️ -- Deletar Usuário:

```
DELETE: http://localhost:3000/users
Headers: {
	"Authorization": "Bearer token"
}


```

**Resultado:**

```
Usuário deletado com sucesso
```

### Rota Devices 💻 -- Buscar lista de dispositivos:

```
GET: http://localhost:3000/devices/

```

**Resultado:**

```
[
  {
    "_id": 1,
    "name": "Lâmpada LED",
    "type": "Energia",
    "madeBy": "Intelbras",
    "photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/160115-1000-1000/ews_407_front_cor.jpg?v=637564221001370000",
    "info": {
      "_id": 1,
      "virtual_id": "abcd1234",
      "ip_address": "127.0.0.1",
      "mac_address": "127.0.0.1",
      "signal": "-70dBm"
    }
  },
  {
    "_id": 2,
    "name": "Lâmpada LED",
    "type": "Energia",
    "madeBy": "Intelbras",
    "photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/160115-1000-1000/ews_407_front_cor.jpg?v=637564221001370000",
    "info": {
      "_id": 2,
      "virtual_id": "abcd1234",
      "ip_address": "127.0.0.1",
      "mac_address": "127.0.0.1",
      "signal": "-70dBm"
    }
  },
  ...
```

### Rota Devices 💻 -- Buscar por dispositivo:

```
GET: http://localhost:3000/devices/:id

```

**Resultado:**

```
{
  "_id": 3,
  "name": "Interruptor conector inteligente",
  "type": "Energia",
  "madeBy": "Intelbras",
  "photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/161376-1000-1000/ews_301_front_cima.jpg?v=637581675693070000",
  "info": {
    "_id": 3,
    "virtual_id": "abcd4321",
    "ip_address": "127.0.0.1",
    "mac_address": "127.0.0.1",
    "signal": "-40dBm"
  }
}
```

### Rota Devices 💻 -- Criar Dispositivo:

```
POST: http://localhost:3000/devices
Headers: {
	"Authorization": "Bearer token"
}

Body: {
	{
		"name": "Lâmpada LED",
		"type": "Energia",
		"madeBy": "Intelbras",
		"photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/160115-1000-1000/ews_407_front_cor.jpg?v=637564221001370000",
		"info": {
			"virtual_id": "abcd1234",
			"ip_address": "127.0.0.1",
			"mac_address": "127.0.0.1",
			"signal": "-70dBm"
		}
	}
}

```

**Resultado:**

```
{
  "name": "Lâmpada LED",
  "type": "Energia",
  "madeBy": "Intelbras",
  "photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/160115-1000-1000/ews_407_front_cor.jpg?v=637564221001370000",
  "info": {
    "virtual_id": "abcd1234",
    "ip_address": "127.0.0.1",
    "mac_address": "127.0.0.1",
    "signal": "-70dBm",
    "_id": 1
  },
  "_id": 1
}
```

### Rota userDevices 👨‍💻 -- Cadastrar Device ao Usuário:

- No params deverá ser o id do dispositivo

```
POST: http://localhost:3000/userDevices/:id


Headers: {
	"Authorization": "Bearer token"
}

Body: {
  "local": "Fabrica",
  "room": "quarto"
	}

```

**Resultado:**

```
{
  "user": {
    "_id": 10
  },
  "devices": {
    "_id": 1
  },
  "is_on": true,
  "local": "Fabrica",
  "room": "quarto",
  "_id": 2,
  "createdAt": "2023-01-15T23:30:46.258Z",
  "updatedAt": "2023-01-15T23:30:46.258Z"
}
```

### Rota userDevices 👨‍💻 -- Receber devices do usuário:

```
GET: http://localhost:3000/userDevices
Headers: {
	"Authorization": "Bearer token"
}


```

**Resultado:**

```
[
  {
    "_id": 2,
    "is_on": true,
    "local": "Fabrica",
    "room": "quarto",
    "devices": {
      "_id": 1,
      "name": "Lâmpada LED",
      "type": "Energia"
    },
    "user": {
      "_id": 10
    }
  }
]
```

**Querys:**

- Local (fabrica, escritorio, casa);
- Page (para paginação)
- Size (para paginação)

```
http://localhost:3000/userDevices?local=fabrica&page=1&size=10
```

### Rota userDevices 👨‍💻 -- Deletar viculação Dispositivo-Usuário:

- É importante que o usuário tenha role admin para tal!;
- O id no params é da vinculação

```
DELETE: http://localhost:3000/userDevices/:id
Headers: {
	"Authorization": "Bearer token"
}

```

**Resultado:**

```
User Device deleted successfully
```

## Aprendizados 💡

- O grande desafio desse projeto foi manipular corretamente autenticações e o typeORM.🔒🗄️
- O JWT não tive grandes dificuldades, mas com typeORM tive dificuldades iniciais em como deveria proceder nas relações. O que me proporcionou um grande aprendizado 🤠
- Ter experimentado um pouco de SQL me despertou interesse em aprender mais sobre banco de dados;📚

## Pontos de melhoria 🚀

- Acredito que o projeto poderia ter sido melhorado com a implementação de testes unitários e de integração.🧪
- Docker também seria uma boa implementação.🐳


## Mensagem Final 💭

- Quero agradecer o professor Yan, além de ter um conhecimento e uma ditática incrível, foi uma pessoa muito paciênte e que sempre respondeu nossas dúvidas com vontade de nos fazer entender o conteúdo. 👨‍🏫
- Também quero agradecer a toda a turma, que foi muito unida e que sempre ajudou uns aos outros. Boas amizades vou levar dessa turma👨‍👩‍👧‍👦
- E por fim quero agradecer a Devinhouse e o pessoal da Intelbras que acreditou nesse projeto;🙏


## Licença 📄

[MIT](https://choosealicense.com/licenses/mit/) 📜
