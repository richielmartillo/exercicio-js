# Validação de Usuários com Jest, API REST e Swagger

Projeto criado inicialmente para praticar lógica de programação e validação de usuários com JavaScript. Ele foi ampliado para incluir testes unitários com Jest, práticas de cobertura de código, uma API REST CRUD com Express, testes de endpoints com Supertest e documentação interativa com Swagger.

## Funcionalidades

- Validação de maioridade;
- Validação da presença de `@` no e-mail;
- Verificação de usuário ativo;
- Validação completa do cadastro;
- Exibição dos usuários em cartões HTML;
- Listagem de usuários pela API;
- Busca de usuário por ID;
- Criação de usuário;
- Atualização de usuário;
- Exclusão de usuário;
- Documentação interativa dos endpoints com Swagger.

## Regras de validação

Um usuário possui cadastro válido quando atende simultaneamente às regras abaixo:

- Tem 18 anos ou mais;
- Possui `@` no e-mail;
- Está ativo.

A validação completa é feita pela função `validarCadastro`:

```js
return maiorIdade && emailValido && ativo
```

## Funções de validação

| Função | Responsabilidade |
| --- | --- |
| `verificarMaiorIdade(idade)` | Retorna `true` para idade maior ou igual a 18. |
| `validarEmail(email)` | Retorna `true` quando o e-mail contém `@`. |
| `usuarioAtivo(usuario)` | Retorna o valor da propriedade `ativo`. |
| `validarCadastro(usuario)` | Combina todas as regras de validação. |

## Endpoints da API

| Método e rota | Descrição | Principais códigos HTTP |
| --- | --- | --- |
| `GET /usuarios` | Retorna todos os usuários. | `200` |
| `GET /usuarios/:id` | Retorna um usuário pelo ID. | `200`, `404` |
| `POST /usuarios` | Cria um usuário quando o cadastro é válido. | `201`, `400` |
| `PUT /usuarios/:id` | Atualiza um usuário e valida o cadastro completo resultante. | `200`, `400`, `404` |
| `DELETE /usuarios/:id` | Exclui um usuário existente. | `204`, `404` |

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- Jest
- Supertest
- Swagger UI Express
- Git e GitHub

## Estrutura do projeto

```text
exercicio-js/
├── api.js
├── api.test.js
├── index.html
├── style.css
├── usuario.js
├── usuario.test.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Como instalar

```bash
git clone https://github.com/richielmartillo/exercicio-js.git
cd exercicio-js
npm install
```

## Como executar a interface

Abra o arquivo `index.html` diretamente no navegador ou execute-o com a extensão Live Server do VS Code.

## Como executar com Node.js

Para visualizar os resultados das validações no terminal:

```bash
node usuario.js
```

## Como iniciar a API

```bash
npm start
```

Com o servidor em execução, os endereços são:

- API: <http://localhost:3000/usuarios>
- Swagger: <http://localhost:3000/api-docs>

No Swagger, use **Try it out** e **Execute** para enviar requisições aos endpoints documentados.

## Exemplos de requisição

Exemplo de corpo JSON para `POST /usuarios`:

```json
{
  "nome": "Mariana",
  "idade": 22,
  "email": "mariana@email.com",
  "ativo": true
}
```

## Testes

Os testes unitários das regras de negócio são feitos com Jest. Eles praticam cobertura de instruções, decisões, condições e caminhos, sem afirmar cobertura completa de caminhos. Os endpoints da API são testados com Jest e Supertest.

Para executar todos os testes:

```bash
npm test
```

## Cobertura de código

Para gerar o relatório de cobertura:

```bash
npm run test:coverage
```

O relatório do Jest apresenta os seguintes indicadores:

- **Statements**: instruções executadas pelos testes;
- **Branches**: caminhos de decisões e expressões condicionais exercitados;
- **Functions**: funções chamadas pelos testes;
- **Lines**: linhas executadas pelos testes.

### Resultados atuais

- 2 suítes aprovadas;
- 25 testes aprovados;
- Statements: 94,44%;
- Branches: 93,05%;
- Functions: 91,30%;
- Lines: 94,25%.

Esses valores podem mudar quando novos testes ou funcionalidades forem adicionados.

## Limitações

- Os dados da API ficam apenas em memória;
- Usuários criados são perdidos quando o servidor é reiniciado;
- Não há banco de dados nem autenticação;
- A validação de e-mail verifica apenas a presença de `@`.

## Autor

Desenvolvido por [Richard Marlon Balestrim](https://github.com/richielmartillo).
