const jwt = require("jsonwebtoken");
const User = require("./User");
const bcrypt = require("bcrypt");

class AuthService {
	constructor(repository) {
		this.repository = repository;
	}

	async register(name, email, password, cpf, semestre, curso, matricula) {
		const UsuariosExistentes = await this.repository.findByEmail(email);
		if (UsuariosExistentes) {
			throw new Error("Esse email já está sendo usado por outro usuário!!");
		}
		const NovoUsuario = new User({ name, email, password, cpf, semestre, curso, matricula });

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

	// UPDATE USER INFO
	async updateUserInfo(userId, { semestre, curso, name }) {
		//if (!semestre || !curso || !nome) {
		//	throw new Error("Todos os campos (semestre, curso, nome) são obrigatórios para atualizar.");
		//}

		await this.repository.update(userId, { semestre, curso, name });
		return { message: "Informações atualizadas com sucesso!" };
	}


	async verificaToken(token) {
		const tokenDecodificado = jwt.verify(token, "segredo-do-jwt");
		const user = await this.repository.findByEmail(tokenDecodificado.email);
		return user;
	}
}

module.exports = AuthService;
