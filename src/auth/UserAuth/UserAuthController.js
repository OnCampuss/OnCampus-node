class AuthController {
	constructor(service) {
		this.service = service;
	}

	async register(request) {
		console.log("Corpo da requisição recebido:", request.body);  // Adicione este log para ver o que está chegando no backend
		const { nome, email, password, cpf, semestre, curso } = request.body;
	
		if (!nome || !email || !password || !cpf || !semestre || !curso) {
			return {
				code: 400,
				body: { message: "Nome, email, senha, CPF, semestre e curso são obrigatórios" },
			};
		}
		try {
			const user = await this.service.register(nome, email, password, cpf, semestre, curso);
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
}

module.exports = AuthController;
