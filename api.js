const express = require("express")
const swaggerUi = require("swagger-ui-express")
const { validarCadastro } = require("./usuario")

const app = express()
const porta = 3000

const usuariosIniciais = [
  {
    id: 1,
    nome: "Carlos",
    idade: 25,
    email: "carlos@email.com",
    ativo: true
  }
]

let usuarios = []
let proximoId = 1

function resetUsuarios() {
  usuarios = usuariosIniciais.map((usuario) => ({ ...usuario }))
  proximoId = Math.max(...usuarios.map((usuario) => usuario.id)) + 1
}

function buscarIndicePorId(id) {
  return usuarios.findIndex((usuario) => usuario.id === Number(id))
}

function temCamposObrigatorios(usuario) {
  const campos = ["nome", "idade", "email", "ativo"]

  if (!usuario || typeof usuario !== "object") {
    return false
  }

  return campos.every(
    (campo) => Object.hasOwn(usuario, campo) && usuario[campo] !== undefined && usuario[campo] !== null
  )
}

function possuiFormatoValido(usuario) {
  return (
    typeof usuario.nome === "string" &&
    usuario.nome.trim().length > 0 &&
    typeof usuario.idade === "number" &&
    Number.isFinite(usuario.idade) &&
    typeof usuario.email === "string" &&
    typeof usuario.ativo === "boolean"
  )
}

function cadastroEValido(usuario) {
  return temCamposObrigatorios(usuario) && possuiFormatoValido(usuario) && validarCadastro(usuario)
}

function dadosAtualizaveis(usuario) {
  const { nome, idade, email, ativo } = usuario || {}

  return {
    ...(nome !== undefined && { nome }),
    ...(idade !== undefined && { idade }),
    ...(email !== undefined && { email }),
    ...(ativo !== undefined && { ativo })
  }
}

const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "API de Usuários",
    version: "1.0.0",
    description: "CRUD em memória para usuários com validação de cadastro."
  },
  servers: [{ url: `http://localhost:${porta}`, description: "Servidor local" }],
  paths: {
    "/usuarios": {
      get: {
        summary: "Lista todos os usuários",
        responses: {
          200: {
            description: "Lista de usuários",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Usuario" } } } }
          }
        }
      },
      post: {
        summary: "Cria um usuário",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/NovoUsuario" }, example: { nome: "Maria", idade: 22, email: "maria@email.com", ativo: true } } }
        },
        responses: {
          201: { description: "Usuário criado", content: { "application/json": { schema: { $ref: "#/components/schemas/Usuario" } } } },
          400: { description: "Campos obrigatórios ausentes ou cadastro inválido" }
        }
      }
    },
    "/usuarios/{id}": {
      get: {
        summary: "Busca um usuário pelo ID",
        parameters: [{ $ref: "#/components/parameters/IdUsuario" }],
        responses: {
          200: { description: "Usuário encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Usuario" } } } },
          404: { description: "Usuário não encontrado" }
        }
      },
      put: {
        summary: "Atualiza um usuário pelo ID",
        parameters: [{ $ref: "#/components/parameters/IdUsuario" }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/AtualizacaoUsuario" }, example: { nome: "Carlos Silva" } } }
        },
        responses: {
          200: { description: "Usuário atualizado", content: { "application/json": { schema: { $ref: "#/components/schemas/Usuario" } } } },
          400: { description: "Cadastro atualizado inválido" },
          404: { description: "Usuário não encontrado" }
        }
      },
      delete: {
        summary: "Exclui um usuário pelo ID",
        parameters: [{ $ref: "#/components/parameters/IdUsuario" }],
        responses: {
          204: { description: "Usuário excluído" },
          404: { description: "Usuário não encontrado" }
        }
      }
    }
  },
  components: {
    parameters: {
      IdUsuario: {
        name: "id",
        in: "path",
        required: true,
        description: "ID numérico do usuário",
        schema: { type: "integer", example: 1 }
      }
    },
    schemas: {
      Usuario: {
        type: "object",
        required: ["id", "nome", "idade", "email", "ativo"],
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string", example: "Carlos" },
          idade: { type: "integer", minimum: 18, example: 25 },
          email: { type: "string", example: "carlos@email.com" },
          ativo: { type: "boolean", example: true }
        }
      },
      NovoUsuario: {
        type: "object",
        required: ["nome", "idade", "email", "ativo"],
        properties: {
          nome: { type: "string", example: "Maria" },
          idade: { type: "integer", minimum: 18, example: 22 },
          email: { type: "string", example: "maria@email.com" },
          ativo: { type: "boolean", example: true }
        }
      },
      AtualizacaoUsuario: {
        type: "object",
        description: "Informe somente os campos que deseja atualizar. O cadastro completo resultante precisa continuar válido.",
        properties: {
          nome: { type: "string", example: "Carlos Silva" },
          idade: { type: "integer", minimum: 18, example: 26 },
          email: { type: "string", example: "carlos.silva@email.com" },
          ativo: { type: "boolean", example: true }
        }
      }
    }
  }
}

resetUsuarios()

app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/usuarios", (req, res) => {
  return res.status(200).json(usuarios)
})

app.get("/usuarios/:id", (req, res) => {
  const indice = buscarIndicePorId(req.params.id)

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Usuário não encontrado." })
  }

  return res.status(200).json(usuarios[indice])
})

app.post("/usuarios", (req, res) => {
  if (!temCamposObrigatorios(req.body)) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." })
  }

  if (!cadastroEValido(req.body)) {
    return res.status(400).json({ mensagem: "Dados de cadastro inválidos." })
  }

  const usuario = { id: proximoId, ...dadosAtualizaveis(req.body) }
  proximoId += 1
  usuarios.push(usuario)

  return res.status(201).json(usuario)
})

app.put("/usuarios/:id", (req, res) => {
  const indice = buscarIndicePorId(req.params.id)

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Usuário não encontrado." })
  }

  const usuarioAtualizado = { ...usuarios[indice], ...dadosAtualizaveis(req.body) }

  if (!cadastroEValido(usuarioAtualizado)) {
    return res.status(400).json({ mensagem: "Dados de cadastro inválidos." })
  }

  usuarios[indice] = usuarioAtualizado
  return res.status(200).json(usuarioAtualizado)
})

app.delete("/usuarios/:id", (req, res) => {
  const indice = buscarIndicePorId(req.params.id)

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Usuário não encontrado." })
  }

  usuarios.splice(indice, 1)
  return res.status(204).send()
})

if (require.main === module) {
  app.listen(porta, () => {
    console.log(`Servidor executando em http://localhost:${porta}`)
  })
}

app.resetUsuarios = resetUsuarios

module.exports = app
