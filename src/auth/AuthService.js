const jwt = require("jsonwebtoken");
const User = require("./User");
const bcrypt = require("bcrypt");

class AuthService {
	constructor(repository) {
		this.repository = repository;
	}
	// Método para registrar novos usuários
	async register(name, email, password) {
		const UsuariosExistentes = await this.repository.findByEmail(email);
		if (UsuariosExistentes)
			throw new Error("Esse email já está sendo usado por outro usuário!!  ");
		const NovoUsuario = new User({ name, email, password });

		//Adicionando a biblioteca bcrypt, ela serve para fazer uma criptografia da senha.
		NovoUsuario.password = bcrypt.hashSync(NovoUsuario.password, 10);
		await this.repository.save(NovoUsuario);
		return NovoUsuario;
	}

	//Método de Login
	async login(email, password) {
		const user = await this.repository.findByEmail(email);
		if (!user) throw new Error("Usuário não encontrado");

		const ComparaSenhas = bcrypt.compareSync(password, user.password);
		if (!ComparaSenhas) throw new Error("Senha incorreta!!");

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			"segredo-do-jwt",
			{ expiresIn: "1d" },
		);
		//ExpiresIn :Válido por quanto tempo*
		return { token, user };
	}

	async verificaToken(token) {
		const tokenDecodificado = jwt.verify(token, "segredo-do-jwt");
		const user = await this.repository.findByEmail(tokenDecodificado.email);
		return user;
	}
}
module.exports = AuthService;
