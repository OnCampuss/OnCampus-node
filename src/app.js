const fastify = require("fastify");
const app = fastify({ logger: true });

//Travel Vote
const TravelVoteRepository = require("./travelVote/travelVoteRepository");
const TravelVoteService = require("./travelVote/travelVoteService");
const TravelVoteController = require("./travelVote/travelVoteController");

// Autenticacao User
const UserPostgreRepository = require("./auth/UserAuth/UserPostgreRepository");
const AuthService = require("./auth/UserAuth/UserAuthService");
const AuthController = require("./auth/UserAuth/UserAuthController");

//Motorista
const MotoraRepository = require("./auth/MotoraAuth/MotoraRepository");
const MotoraService = require("./auth/MotoraAuth/MotoraAuthService");
const MotoraController = require("./auth/MotoraAuth/MotoraAuthController");

// Criação de viagens
const travelPostgreRepository = require("./travels/travelPostgreRepository");
const TravelService = require("./travels/travelService");
const TravelController = require("./travels/travelController");

// Initialize repositories, services, and controllers in the correct order
const voteRepository = new TravelVoteRepository();
const voteService = new TravelVoteService(voteRepository);
const voteController = new TravelVoteController(voteService);

const userRepository = new UserPostgreRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const motoraRepository = new MotoraRepository();
const motoraService = new MotoraService(motoraRepository);
const motoraAuthController = new MotoraController(motoraService);

const travelRepository = new travelPostgreRepository();
const travelService = new TravelService(travelRepository);
const travelController = new TravelController(travelService);

const validadorDeOpcaoAutenticacao = {
	preHandler: async (request, reply) => {
		const token = request.headers.authorization?.replace(/^Bearer /, "");
		if (!token)
			reply.code(401).send({ message: "Não autorizado!!   DEBUG: Faltando Token" });

		const user = await authService.verificaToken(token);
		if (!user)
			reply.code(404).send({ message: "Não autorizado!! Token Inválido" });
		request.user = user;
	},
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

//Criação da viagens
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

// Registro de criação de Usuário para Motorista
app.post("/api/auth/registerMotora", async (request, reply) => {
	const { code, body } = await motoraAuthController.register(request);
	reply.code(code).send(body);
});

app.post("/api/auth/loginMotora", async (request, reply) => {
	const { code, body } = await motoraAuthController.login(request);
	reply.code(code).send(body);
});

// Rota de votação
app.post("/api/travels/:travelId/votes", validadorDeOpcaoAutenticacao, async (request, reply) => {
	const { code, body } = await voteController.save(request, reply);
	reply.code(code).send(body);
});

app.get("/api/votes", validadorDeOpcaoAutenticacao, async (request, reply) => {
	const { code, body } = await voteController.index(request);
	reply.code(code).send(body);
});

app.put("/api/votes/:id", validadorDeOpcaoAutenticacao, async (request, reply) => {
	const { code, body } = await voteController.update(request, reply);
	reply.code(code).send(body);
});

module.exports = app;
