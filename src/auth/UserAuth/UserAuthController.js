class AuthController {
	constructor(service) {
		this.service = service;
	}

	async register(request) {
		const { name, email, password } = request.body;
		if (!name || !email || !password) {
			return {
				code: 400,
				body: { message: "Nome, email, senha são obrigatórios" },
			};
		}
		try {
			const user = await this.service.register(name, email, password);
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
				body: { message: "email e senha senha são obrigatórios" },
			};
		}
		try {
			const body = await this.service.login(email, password);
			return { code: 200, body };
		} catch (error) {
			return { code: 400, body: { message: error.message } };
		}
	}
}

module.exports = AuthController;
