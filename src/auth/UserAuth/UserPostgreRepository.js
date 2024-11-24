const db = require("../../database");
const User = require("./User");

class UserPostgreRepository {
	constructor() {
		this.db = db;
	}

	async findByEmail(email) {
		const UsuarioArmazenado = await this.db.oneOrNone("SELECT * FROM Users WHERE email = $1", email);
		return UsuarioArmazenado ? new User(UsuarioArmazenado) : null;
	}

	async save(user) {
		await this.db.none("INSERT INTO Users (id, name, email, password, cpf, semestre, curso, matricula) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
			user.id,
			user.name,
			user.email,
			user.password,
			user.cpf,
			user.semestre,
			user.curso,
			user.matricula
		]);
	}

	async update(userId, { semestre, curso, name }) {
		await this.db.none(
			"UPDATE Users SET semestre = $1, curso = $2, name = $3 WHERE id = $4",
			[semestre, curso, name, userId]
		);
	}


}

module.exports = UserPostgreRepository;
