// Lista de usuários
const usuarios = [
  {
    nome: "Carlos",
    idade: 25,
    email: "carlos@email.com",
    ativo: true
  },
  {
    nome: "Ana",
    idade: 16,
    email: "anaemail.com",
    ativo: false
  },
  {
    nome: "Marcos",
    idade: 30,
    email: "marcos@email.com",
    ativo: true
  },
  {
    nome: "Julia",
    idade: 17,
    email: "julia@email.com",
    ativo: true
  }
]

// Verifica se a pessoa possui 18 anos ou mais
function verificarMaiorIdade(idade) {
  if (idade >= 18) {
    return true
  } else {
    return false
  }
}

// Verifica se o e-mail contém o caractere "@"
function validarEmail(email) {
  return email.includes("@")
}

// Verifica se o usuário está ativo
function usuarioAtivo(usuario) {
  return usuario.ativo
}

// Combina todas as validações
function validarCadastro(usuario) {
  const maiorIdade = verificarMaiorIdade(usuario.idade)
  const emailValido = validarEmail(usuario.email)
  const ativo = usuarioAtivo(usuario)

  return maiorIdade && emailValido && ativo
}

// Cria os cartões no HTML
function exibirUsuarios() {
  const listaUsuarios = document.querySelector("#lista-usuarios")

  usuarios.forEach((usuario) => {
    const maiorIdade = verificarMaiorIdade(usuario.idade)
    const emailValido = validarEmail(usuario.email)
    const ativo = usuarioAtivo(usuario)
    const cadastroValido = validarCadastro(usuario)

    const cartao = document.createElement("article")
    cartao.classList.add("cartao")

    cartao.innerHTML = `
      <h2>${usuario.nome}</h2>

      <p>
        Idade: <strong>${usuario.idade}</strong>
      </p>

      <p class="${maiorIdade ? "valido" : "invalido"}">
        Maior de idade: ${maiorIdade ? "Sim" : "Não"}
      </p>

      <p class="${emailValido ? "valido" : "invalido"}">
        E-mail válido: ${emailValido ? "Sim" : "Não"}
      </p>

      <p class="${ativo ? "valido" : "invalido"}">
        Usuário ativo: ${ativo ? "Sim" : "Não"}
      </p>

      <p class="${cadastroValido ? "valido" : "invalido"}">
        <strong>
          Cadastro: ${cadastroValido ? "Aprovado" : "Reprovado"}
        </strong>
      </p>
    `

    listaUsuarios.appendChild(cartao)
  })
}

// Executa a interface somente no navegador
if (typeof document !== "undefined") {
  exibirUsuarios()
}

// Exporta as funções somente no Node.js/Jest
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    verificarMaiorIdade,
    validarEmail,
    usuarioAtivo,
    validarCadastro
  }
}

// Mostra os resultados somente ao executar: node usuario.js
if (
  typeof require !== "undefined" &&
  typeof module !== "undefined" &&
  require.main === module
) {
  usuarios.forEach((usuario, indice) => {
    console.log(
      `Usuário ${indice + 1} (${usuario.nome}) válido?`,
      validarCadastro(usuario)
    )
  })
}