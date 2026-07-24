const {
  verificarMaiorIdade,
  validarEmail,
  usuarioAtivo,
  validarCadastro
} = require("./usuario")

describe("verificarMaiorIdade", () => {
  // Cobertura de decisão: os dois resultados do if (idade >= 18).
  test.each([
    [17, false],
    [18, true],
    [19, true]
  ])("idade %i retorna %s", (idade, resultadoEsperado) => {
    expect(verificarMaiorIdade(idade)).toBe(resultadoEsperado)
  })
})

describe("validarEmail", () => {
  // Cobertura de decisão da expressão email.includes("@").
  test.each([
    ["ana@email.com", true],
    ["anaemail.com", false]
  ])("e-mail %s retorna %s", (email, resultadoEsperado) => {
    expect(validarEmail(email)).toBe(resultadoEsperado)
  })
})

describe("usuarioAtivo", () => {
  // Cobertura de decisão da condição representada pela propriedade ativo.
  test.each([
    [true, true],
    [false, false]
  ])("usuário com ativo=%s retorna %s", (ativo, resultadoEsperado) => {
    expect(usuarioAtivo({ ativo })).toBe(resultadoEsperado)
  })
})

describe("validarCadastro", () => {
  // Estes quatro cenários fazem cobertura de condições (cada condição isolada)
  // e dos quatro caminhos avaliáveis da expressão maiorIdade && emailValido && ativo.
  // As três validações são calculadas antes do &&; portanto, não há desvio de
  // chamadas de função por curto-circuito e não existe operador || nesta função.
  test.each([
    ["todos válidos: true && true && true", 18, "ana@email.com", true, true],
    ["somente idade inválida: false && true && true", 17, "ana@email.com", true, false],
    ["somente e-mail inválido: true && false && true", 18, "anaemail.com", true, false],
    ["somente status inválido: true && true && false", 18, "ana@email.com", false, false]
  ])("caminho: %s retorna %s", (caminho, idade, email, ativo, resultadoEsperado) => {
    expect(validarCadastro({ idade, email, ativo })).toBe(resultadoEsperado)
  })
})

describe("exibição de usuários", () => {
  afterEach(() => {
    delete global.document
    jest.resetModules()
  })

  test("cria um cartão para cada usuário quando há um documento HTML", () => {
    const cartoes = []
    const listaUsuarios = {
      appendChild: (cartao) => cartoes.push(cartao)
    }

    global.document = {
      querySelector: jest.fn(() => listaUsuarios),
      createElement: jest.fn(() => ({
        classList: { add: jest.fn() },
        innerHTML: ""
      }))
    }

    jest.resetModules()
    require("./usuario")

    expect(document.querySelector).toHaveBeenCalledWith("#lista-usuarios")
    expect(cartoes).toHaveLength(4)
    expect(cartoes[0].innerHTML).toContain("Carlos")
    expect(cartoes[0].innerHTML).toContain("Cadastro: Aprovado")
  })
})
