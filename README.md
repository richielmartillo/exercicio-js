# Validação de usuários

Projeto desenvolvido para praticar lógica de programação com JavaScript, validação de dados e manipulação do HTML.

A aplicação verifica se cada usuário possui um cadastro válido e apresenta os resultados em cartões na página.

## Funcionalidades

Cada usuário passa pelas seguintes validações:

- Verificação de maioridade;
- Verificação do caractere `@` no e-mail;
- Verificação de usuário ativo;
- Validação completa do cadastro.

O cadastro somente é aprovado quando todas as condições retornam `true`.

```js
return maiorIdade && emailValido && ativo
```

## Regras de validação

Um cadastro é considerado válido quando:

- O usuário possui 18 anos ou mais;
- O e-mail contém o caractere `@`;
- O usuário está ativo.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Git e GitHub

## Estrutura do projeto

```text
exercicio-js/
├── index.html
├── style.css
├── usuario.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Como executar no navegador

1. Clone o repositório:

```bash
git clone https://github.com/richielmartillo/exercicio-js.git
```

2. Entre na pasta do projeto:

```bash
cd exercicio-js
```

3. Abra o arquivo `index.html` no navegador.

Também é possível executar o projeto utilizando a extensão Live Server do VS Code.

## Como executar com Node.js

No terminal, dentro da pasta do projeto, execute:

```bash
node usuario.js
```

## Funções principais

### `verificarMaiorIdade(idade)`

Retorna `true` quando a idade é maior ou igual a 18.

### `validarEmail(email)`

Retorna `true` quando o e-mail contém o caractere `@`.

### `usuarioAtivo(usuario)`

Retorna o valor da propriedade `ativo` do usuário.

### `validarCadastro(usuario)`

Combina todas as validações e retorna `true` somente quando todas forem aprovadas.

## Cenários utilizados

- Carlos: cadastro aprovado;
- Ana: menor de idade, e-mail inválido e usuário inativo;
- Marcos: cadastro aprovado;
- Julia: cadastro reprovado por ser menor de idade.

## Autor

Desenvolvido por [Richard Marlon Balestrim](https://github.com/richielmartillo).
