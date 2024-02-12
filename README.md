# Clients & Contacts

Esta API consiste em um cadastro de clientes que poderá conter muitos contatos associados.

É possível realizar operações de criação, leitura, edição e deleção de clientes e contatos.

💻

## Índice

- [Tecnologias e ferramentas](#1-tecnologias-e-ferramentas)
- [Primeiros passos](#2-primeiros-passos)
- [Diagrama de Relacionamento](#3-diagrama-de-relacionamento)
- [Rotas clients e login](#4-rotas-clients-e-login)
- [Regras de negócio das rotas clients e login](#5-regras-de-negócio-das-rotas-clients-e-login)
- [Rotas contacts](#6-rotas-contacts)
- [Regras de negócio das rotas contacts](#7-regras-de-negócio-das-rotas-contacts)

---

## 1. Tecnologias e ferramentas

[voltar para o índice](#índice)

- Express
- TypeScript
- PostgreSQL
- TypeORM
- Insomnia

---

## 2. Primeiros passos

[voltar para o índice](#índice)

1. Clone o repositório em sua máquina.
2. Instale as dependências rodando o seguinte comando:

```shell
npm install
```

3. Crie um arquivo **.env**, seguindo os exemplos de variáveis de ambiente contidas no arquivo **.env.example**.
4. Gere as migrações com o seguinte comando:

```shell
npm run typeorm:generate
```

5. Execute as migrações com o seguinte comando:

```shell
npm run typeorm:run
```

6. Caso queira, você pode testar as rotas por meio da collection **insomnia_m6_desafio_fullstack**. Esse arquivo está localizado na raiz do projeto.
7. A API está prontinha para ser consumida. 😄🚀

---

## 3. Diagrama de Relacionamento

[voltar para o índice](#índice)

![der](DER.png)

---

## 4. Rotas clients e login

[voltar para o índice](#índice)

| Método | Endpoint           | Responsabilidade                  | Autenticação                               |
| ------ | ------------------ | --------------------------------- | ------------------------------------------ |
| POST   | /clients           | Cria um cliente                   | Não necessita token                        |
| POST   | /login             | Gera o token de autenticação      | Não necessita token                        |
| GET    | /clients           | Lista todos os clientes           | Apenas administradores                     |
| GET    | /clients/logged    | Lista dados do cliente logado     | Usuário logado                             |
| GET    | /clients/:clientId | Lista um cliente por id           | Usuário dono do contato ou administradores |
| PATCH  | /clients/:clientId | Atualiza um cliente               | Usuário dono do contato ou administradores |
| DELETE | /clients/:clientId | Realiza um soft delete no cliente | Usuário dono do contato ou administradores |

---

## 5. Regras de negócio das rotas clients e login

[voltar para o índice](#índice)

### POST /clients

Permite a criação de um novo cliente.

_Qualquer usuário_ pode acessar a rota.

A chave **admin** não é obrigatória, sendo _false_ por padrão.

###### Corpo da requisição (Json)

```json
{
  "name": "Hayley Williams",
  "email": "hayley@mail.com",
  "password": "1234",
  "phoneNumber": "850"
}
```

###### Exemplo de resposta: status 201 Created

```json
{
  "id": 1,
  "name": "Hayley Williams",
  "email": "hayley@mail.com",
  "phoneNumber": "850",
  "admin": false,
  "registeredAt": "2024-01-24",
  "deletedAt": null
}
```

###### Corpo da requisição (Json)

```json
{
  "name": "Taylor Swift",
  "email": "taylor@mail.com",
  "password": "1234",
  "phoneNumber": "850",
  "admin": true
}
```

###### Exemplo de resposta: status 201 Created

```json
{
  "id": 2,
  "name": "Taylor Swift",
  "email": "taylor@mail.com",
  "phoneNumber": "850",
  "admin": true,
  "registeredAt": "2024-01-24",
  "deletedAt": null
}
```

###### Corpo da requisição (Json)

```json
{
  "name": "James Taylor",
  "email": "taylor@mail.com",
  "password": "1234",
  "phoneNumber": "850"
}
```

###### Exemplo de resposta (email existente): status 409 Conflict

```json
{
  "message": "Email already exists"
}
```

###### Corpo da requisição (Json)

```json
// sem corpo
```

###### Exemplo de resposta (requisição sem corpo): status 400 Bad Request

```json
{
  "message": {
    "name": ["Required"],
    "email": ["Required"],
    "password": ["Required"],
    "phoneNumber": ["Required"]
  }
}
```

---

### POST /login

Permite que o usuário faça o login, gerando um token de autenticação.

_Qualquer usuário_ pode acessar a rota.

###### Corpo da requisição (Json)

```json
{
  "email": "hayley@mail.com",
  "password": "1234"
}
```

###### Exemplo de resposta: status 200 OK

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWxleUBtYWlsLmNvbSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNzA2MTE1MTE0LCJleHAiOjE3MDYyODc5MTQsInN1YiI6IjEifQ.pDssBE2cmhLqg_Q1Q5tCUkdXrv9vIhPACowMfpNVcPE"
}
```

###### Corpo da requisição (Json)

```json
{
  "email": "taylor@mail.com",
  "password": "12"
}
```

###### Exemplo de resposta (credenciais incorretas): status 401 Unauthorized

```json
{
  "message": "Invalid email or password"
}
```

---

### GET /clients

Lista todos os clientes cadastrados na aplicação.

Apenas usuários _administradores_ podem acessar essa rota.

###### Exemplo de resposta (administrador): status 200 OK

```json
[
  {
    "id": 1,
    "name": "Hayley Williams",
    "email": "hayley@mail.com",
    "phoneNumber": "850",
    "admin": false,
    "registeredAt": "2024-01-24",
    "deletedAt": null
  },
  {
    "id": 2,
    "name": "Taylor Swift",
    "email": "taylor@mail.com",
    "phoneNumber": "850",
    "admin": true,
    "registeredAt": "2024-01-24",
    "deletedAt": null
  },
  {
    "id": 3,
    "name": "teste",
    "email": "teste@mail.com",
    "phoneNumber": "850",
    "admin": false,
    "registeredAt": "2024-01-24",
    "deletedAt": null
  }
]
```

###### Exemplo de resposta (usuário não administrador): status 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```

###### Exemplo de resposta (usuário não logado): status 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

---

### GET /clients/logged

Retorna informações do usuário logado.

Podem acessar essa rota usuários _logados_.

###### Corpo da requisição (Json)

```json
// sem corpo
```

###### Exemplo de resposta (requisição sem corpo): status 400 Bad Request

```json
{
  "id": 2,
  "name": "Taylor Swift",
  "email": "taylor@mail.com",
  "phoneNumber": "850",
  "admin": true,
  "registeredAt": "2024-01-24",
  "deletedAt": null,
  "contacts": [
    {
      "id": 1,
      "name": "Olivia Rodrigo",
      "email": "olivia@mail.com",
      "phoneNumber": "900",
      "registeredAt": "2024-01-24",
      "deletedAt": null
    },
    {
      "id": 4,
      "name": "Olivia Rodrigo",
      "email": "olivia@mail.com",
      "phoneNumber": "900",
      "registeredAt": "2024-01-24",
      "deletedAt": null
    }
  ]
}
```

---

### GET /clients/:clientId

Lista um determinado cliente pelo seu id.

Podem acessar essa rota usuários _administradores_ ou o _cliente logado_ detentor do referido id.

###### Exemplo de resposta: status 200 OK

```json
{
  "id": 1,
  "name": "Hayley Williams",
  "email": "hayley@mail.com",
  "phoneNumber": "850",
  "admin": false,
  "registeredAt": "2024-01-24",
  "deletedAt": null
}
```

###### Exemplo de resposta (usuário sem permissão): status 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```

###### Exemplo de resposta (usuário não logado): status 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

###### Exemplo de resposta (cliente não encontrado): status 404 Not Found

```json
{
  "message": "Client not found"
}
```

---

### PATCH /clients/:clientId

Permite atualizar de forma parcial ou integral um determinado cliente pelo seu id.

Podem acessar essa rota usuários _administradores_ ou o _cliente logado_ detentor do referido id.

###### Corpo da requisição (Json)

```json
{
  "name": "Usuário de teste"
}
```

###### Exemplo de resposta: status 200 OK

```json
{
  "id": 3,
  "name": "Usuário de teste",
  "email": "teste@mail.com",
  "phoneNumber": "850",
  "admin": false,
  "registeredAt": "2024-01-24",
  "deletedAt": null
}
```

###### Exemplo de resposta (usuário sem permissão): status 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```

###### Exemplo de resposta (usuário não logado): status 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

###### Exemplo de resposta (cliente não encontrado): status 404 Not Found

```json
{
  "message": "Client not found"
}
```

---

### DELETE /clients/:clientId

Permite realizar um soft delete de um determinado cliente pelo seu id.

Podem acessar essa rota usuários _administradores_ ou o _cliente logado_ detentor do referido id.

Não há corpo de requisição nem de resposta.

###### Exemplo de resposta: status 204 No Content

```json
// No body returned for response
```

###### Exemplo de resposta (usuário não logado): status 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

###### Exemplo de resposta (cliente não encontrado): status 404 Not Found

```json
{
  "message": "Client not found"
}
```

---

## 6. Rotas contacts

[voltar para o índice](#índice)

| Método | Endpoint                    | Responsabilidade                                    | Autenticação                               |
| ------ | --------------------------- | --------------------------------------------------- | ------------------------------------------ |
| GET    | /contacts                   | Lista todos os contatos                             | Apenas administradores                     |
| POST   | /contacts                   | Cria um contato                                     | Usuário logado ou administradores          |
| GET    | /contacts/clients/:clientId | Lista todas os contatos do usuário logado           | Usuário logado ou administradores          |
| GET    | /contacts/:contactId        | Lista um contato por id                             | Usuário dono do contato ou administradores |
| PATCH  | /contacts/:contactId        | Atualiza o contato do usuário logado                | Usuário dono do contato ou administradores |
| DELETE | /contacts/:contactId        | Realiza um soft delete no contato do usuário logado | Usuário logado ou administradores          |

---

## 7. Regras de negócio das rotas contacts

[voltar para o índice](#índice)

### GET /contacts

Lista todos os contatos cadastrados na aplicação, de todos os clientes.

Apenas usuários _administradores_ podem acessar essa rota.

###### Exemplo de resposta: status 200 OK

```json
[
  {
    "id": 1,
    "name": "Olivia Rodrigo",
    "email": "olivia@mail.com",
    "phoneNumber": "900",
    "registeredAt": "2024-01-24",
    "deletedAt": null
  },
  {
    "id": 2,
    "name": "Zac Farro",
    "email": "zac@mail.com",
    "phoneNumber": "900123",
    "registeredAt": "2024-01-24",
    "deletedAt": null
  }
]
```

###### Exemplo de resposta (usuário não administrador): status 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```

###### Exemplo de resposta (usuário não logado): status 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

---

### POST /contacts

Permite criar um contato atrelado ao usuário logado, seja ele um cliente comum ou um administrador.

Podem acessar essa rota usuários _administradores_ ou _cliente logado_.

###### Corpo da requisição (Json)

```json
{
	{
	"name": "Olivia Rodrigo",
	"email": "olivia@mail.com",
	"phoneNumber": "900"
}
}
```

###### Exemplo de resposta: status 201 Created

```json
{
  "message": "Contact created"
}
```

###### Exemplo de resposta (usuário não logado): status 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

###### Corpo da requisição (Json)

```json
// sem corpo
```

###### Exemplo de resposta (requisição sem corpo): status 400 Bad Request

```json
{
  "message": {
    "name": ["Required"],
    "email": ["Required"],
    "phoneNumber": ["Required"]
  }
}
```

---

### GET /contacts/clients/:clientId

Lista todos os contatos criados pelo cliente logado detentor do id.

Podem acessar essa rota usuários _administradores_ ou o _cliente logado_ detentor do referido id.

###### Exemplo de resposta: status 200 OK

```json
[
  {
    "id": 2,
    "name": "Zacccccc",
    "email": "zachw@email.com",
    "phoneNumber": "12345678",
    "registeredAt": "2024-01-24",
    "deletedAt": null
  },
  {
    "id": 3,
    "name": "Taylor York",
    "email": "tayloryork@mail.com",
    "phoneNumber": "900123",
    "registeredAt": "2024-01-24",
    "deletedAt": null
  }
]
```

###### Exemplo de resposta (usuário sem permissão): status 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```

###### Exemplo de resposta (usuário não logado): status 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

###### Exemplo de resposta (cliente não encontrado): status 404 Not Found

```json
{
  "message": "Client not found"
}
```

---

### GET /contacts/:contactId

Lista um contato por id.

Podem acessar essa rota usuários _administradores_ ou o _cliente logado_ que criou o contato.

###### Exemplo de resposta: status 200 OK

```json
{
  "id": 1,
  "name": "Olivia Rodrigo",
  "email": "olivia@mail.com",
  "phoneNumber": "900",
  "registeredAt": "2024-01-24",
  "deletedAt": null
}
```

###### Exemplo de resposta (contato não encontrado): status 404 Not Found

```json
{
  "message": "Contact not found"
}
```

###### Exemplo de resposta (usuário sem permissão): status 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```

###### Exemplo de resposta (usuário não logado): status 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

---

### PATCH /contacts/:contactId

Atualiza de forma parcial ou integral o contato detentor do id que foi criado pelo usuário logado.

Podem acessar essa rota usuários _administradores_ ou o _cliente logado_ que criou o contato.

###### Corpo da requisição (Json)

```json
{
  "name": "Zach W. Farro",
  "email": "zachw@email.com",
  "phoneNumber": "12345678"
}
```

###### Exemplo de resposta: status 200 OK

```json
{
  "id": 2,
  "name": "Zach W. Farro",
  "email": "zachw@email.com",
  "phoneNumber": "12345678",
  "registeredAt": "2024-01-24",
  "deletedAt": null
}
```

###### Exemplo de resposta (usuário sem permissão): status 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```

###### Exemplo de resposta (usuário não logado): status 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

---

### DELETE /contacts/:contactId

Permite realizar um soft delete de um determinado contato criado pelo usuário logado.

Podem acessar essa rota usuários _administradores_ ou o _cliente logado_ que criou o contato.

Não há corpo de requisição nem de resposta.

###### Exemplo de resposta: status 204 No Content

```json
// No body returned for response
```

###### Exemplo de resposta (usuário não logado): status 401 Unauthorized

```json
{
  "message": "Missing bearer token"
}
```

###### Exemplo de resposta (contato não encontrado): status 404 Not Found

```json
{
  "message": "Contact not found"
}
```

###### Exemplo de resposta (usuário sem permissão): status 403 Forbidden

```json
{
  "message": "Insufficient permission"
}
```
