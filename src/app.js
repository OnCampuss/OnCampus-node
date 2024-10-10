const fastify = require("fastify");
const UserPostgreRepository = require("./auth/UserPostgreRepository");
const AuthService = require("./auth/AuthService");
const AuthController = require("./auth/AuthController");

const travelPostgreRepository = require("./travels/travelPostgreRepository");
const TravelService = require("./travels/travelService");
const TravelController = require("./travels/travelController");

const app = fastify({ logger: true });

const travelRepository = new travelPostgreRepository();
const travelService = new TravelService(travelRepository);
//Vinculado ao método de listar Viagens
const travelController = new TravelController(travelService);

//Usuário
const userRepository = new UserPostgreRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const validadorDeOpcaoAutenticacao = {
	//PreHandler: Faz a verificação do Token do usuário.
	preHandler: async (request, reply) => {
		//Bearer == Token do usuário.
		const token = request.headers.authorization?.replace(/^Bearer /, "");
		if (!token)
			reply
				.code(401)
				.send({ message: "Não autorizado!!   DEBUG: Faltando Token" });

		const user = await authService.verificaToken(token);
		if (!user)
			reply.code(404).send({ message: "Não autorizado!! Token Inválido" });
		request.user = user;
	}
};

// Método que faz apenas um teste se a aplicação está rodando na porta certa
app.get("/hello", (request, reply) => {
	reply.send({ message: "Aplicação rodando Corretamente!!  :" });
});

// Método no qual lista todas as viagens cadastradas
app.get("/api/travels", validadorDeOpcaoAutenticacao, async (request, reply) => {
	const { code, body } = await travelController.index(request);
	reply.code(code).send(body);
});

// Método no qual faz a criação da viagens
app.post("/api/travels", validadorDeOpcaoAutenticacao, async (request, reply) => {
	const { code, body } = await travelController.save(request);
	reply.code(code).send(body);
});

// Registro de login usuário
app.post("/api/auth/register", async (request, reply) => {
	const { code, body } = await authController.register(request);
	reply.code(code).send(body);
});

app.post("/api/auth/login", async (request, reply) => {
	const { code, body } = await authController.login(request);
	reply.code(code).send(body);
});

module.exports = app;
