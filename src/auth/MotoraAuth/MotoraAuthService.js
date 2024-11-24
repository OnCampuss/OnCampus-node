const jwt = require("jsonwebtoken");
const Motora = require("./Motora");
const bcrypt = require("bcrypt");

class MotoraAuthService {
  constructor(repository) {
    this.repository = repository;
  }

  async register(name, email, password) {
    const UsuariosExistentes = await this.repository.findByEmail(email);
    if (UsuariosExistentes) {
      throw new Error("Esse email já está sendo usado por outro usuário!!");
    }
    const NovoUsuario = new Motora({ name, email, password });

    NovoUsuario.password = bcrypt.hashSync(NovoUsuario.password, 10);
    await this.repository.save(NovoUsuario);
    return NovoUsuario;
  }

  async login(email, password) {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error("Usuário não encontrado");

    const ComparaSenhas = bcrypt.compareSync(password, user.password);
    if (!ComparaSenhas) throw new Error("Senha incorreta!!");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "segredo-do-jwt",
      { expiresIn: "30d" },
    );
    return { token, user };
  }

  async verificaToken(token) {
    const tokenDecodificado = jwt.verify(token, "segredo-do-jwt");
    const user = await this.repository.findByEmail(tokenDecodificado.email);
    return user;
  }
}

module.exports = MotoraAuthService;
