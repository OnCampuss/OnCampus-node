const db = require("../../database");
const Motora = require("./Motora");

class MotoraAuthRepository {
  constructor() {
    this.db = db;
  }

  async findByEmail(email) {
    const UsuarioArmazenado = await this.db.oneOrNone("SELECT * FROM Motoradb WHERE email = $1", email);
    return UsuarioArmazenado ? new Motora(UsuarioArmazenado) : null;
  }

  async save(motora) {
    await this.db.none("INSERT INTO Motoradb (id, name, email, password) VALUES ($1, $2, $3, $4)", [
      motora.id,
      motora.name,
      motora.email,
      motora.password,
    ]);
  }
}

module.exports = MotoraAuthRepository;
