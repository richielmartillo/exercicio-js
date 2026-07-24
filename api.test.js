const request = require("supertest")
const app = require("./api")

const usuarioValido = {
  nome: "Maria",
  idade: 22,
  email: "maria@email.com",
  ativo: true
}

describe("API de usuários", () => {
  beforeEach(() => {
    app.resetUsuarios()
  })

  describe("GET /usuarios", () => {
    test("retorna status 200 e uma lista de usuários", async () => {
      const resposta = await request(app).get("/usuarios")

      expect(resposta.status).toBe(200)
      expect(Array.isArray(resposta.body)).toBe(true)
    })
  })

  describe("GET /usuarios/:id", () => {
    test("retorna o usuário existente", async () => {
      const resposta = await request(app).get("/usuarios/1")

      expect(resposta.status).toBe(200)
      expect(resposta.body).toMatchObject({ id: 1, nome: "Carlos" })
    })

    test("retorna 404 para um ID inexistente", async () => {
      const resposta = await request(app).get("/usuarios/999")

      expect(resposta.status).toBe(404)
    })
  })

  describe("POST /usuarios", () => {
    test("cria um usuário válido com status 201 e ID", async () => {
      const resposta = await request(app).post("/usuarios").send(usuarioValido)

      expect(resposta.status).toBe(201)
      expect(resposta.body).toMatchObject(usuarioValido)
      expect(resposta.body.id).toEqual(expect.any(Number))
    })

    test.each([
      ["menor de idade", { ...usuarioValido, idade: 17 }],
      ["e-mail inválido", { ...usuarioValido, email: "mariaemail.com" }],
      ["usuário inativo", { ...usuarioValido, ativo: false }]
    ])("rejeita %s", async (cenario, usuario) => {
      const resposta = await request(app).post("/usuarios").send(usuario)

      expect(resposta.status).toBe(400)
    })

    test("rejeita requisição sem campo obrigatório", async () => {
      const { ativo, ...usuarioSemAtivo } = usuarioValido
      const resposta = await request(app).post("/usuarios").send(usuarioSemAtivo)

      expect(resposta.status).toBe(400)
    })
  })

  describe("PUT /usuarios/:id", () => {
    test("atualiza um usuário existente", async () => {
      const atualizacao = { nome: "Carlos Silva", idade: 30, email: "carlos.silva@email.com", ativo: true }
      const resposta = await request(app).put("/usuarios/1").send(atualizacao)

      expect(resposta.status).toBe(200)
      expect(resposta.body).toMatchObject({ id: 1, ...atualizacao })
    })

    test("retorna 404 para ID inexistente", async () => {
      const resposta = await request(app).put("/usuarios/999").send(usuarioValido)

      expect(resposta.status).toBe(404)
    })

    test("rejeita atualização que deixa o cadastro inválido", async () => {
      const resposta = await request(app).put("/usuarios/1").send({ ativo: false })

      expect(resposta.status).toBe(400)
    })
  })

  describe("DELETE /usuarios/:id", () => {
    test("exclui usuário existente e ele deixa de ser encontrado", async () => {
      const criado = await request(app).post("/usuarios").send(usuarioValido)
      const respostaExclusao = await request(app).delete(`/usuarios/${criado.body.id}`)
      const respostaBusca = await request(app).get(`/usuarios/${criado.body.id}`)

      expect(respostaExclusao.status).toBe(204)
      expect(respostaBusca.status).toBe(404)
    })

    test("retorna 404 para ID inexistente", async () => {
      const resposta = await request(app).delete("/usuarios/999")

      expect(resposta.status).toBe(404)
    })
  })
})
