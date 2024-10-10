const db = require("../database");
const User = require("./User");

class UserPostgreRepository {
	constructor() {
		this.db = db;
	}

	// Realiza a busca do usuário criado com o e-mail
	//Pode se alterar o oneOrNone() por query()
	async findByEmail(email) {
		const UsuarioArmazenado = await this.db.oneOrNone("SELECT * FROM Users WHERE email = $1", email)
		return UsuarioArmazenado ? new User(UsuarioArmazenado) : null
	}

	//Push -- Insere novos usuários "Criação de usuários"

	async save(user) {
		await this.db.none("INSERT INTO Users (id,name,email,password) VALUES ($1, $2,$3,$4)", [
			user.id,
			user.name,
			user.email,
			user.password
		])
	}
}

module.exports = UserPostgreRepository;
