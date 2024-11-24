class AuthController {
	constructor(service) {
		this.service = service;
	}

	async register(request) {
		const { name, email, password, cpf, semestre, curso, matricula } = request.body;
		if (!name || !email || !password || !cpf || !semestre || !curso || !matricula) {
			return {
				code: 400,
				body: { message: "Todos os campos são obrigatórios!!" },
			};
		}
		try {
			const user = await this.service.register(name, email, password, cpf, semestre, curso, matricula);
			return { code: 201, body: user, message: "Usuário criado com sucesso!!" };
		} catch (error) {
			return { code: 400, body: { message: error.message } };
		}
	}

	async login(request) {
		const { email, password } = request.body;
		if (!email || !password) {
			return {
				code: 400,
				body: { message: "Email e senha são obrigatórios" },
			};
		}
		try {
			const body = await this.service.login(email, password);
			return { code: 200, body };
		} catch (error) {
			return { code: 400, body: { message: error.message } };
		}
	}

	async updateUserInfo(request) {
		const { semestre, curso, name } = request.body;
		const user = request.user; // Usuário vai ser pego pelo Token

		try {
			const response = await this.service.updateUserInfo(user.id, { semestre, curso, name });
			return { code: 200, body: response };
		} catch (error) {
			return { code: 400, body: { message: error.message } };
		}
	}



}

module.exports = AuthController;
