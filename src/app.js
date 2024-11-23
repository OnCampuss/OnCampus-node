const fastify = require("fastify");
const app = fastify({ logger: true });


//Travel Vote
const TravelVoteRepository = require("./travelVote/travelVoteRepository");
const TravelVoteService = require("./travelVote/travelVoteService");
const TravelVoteController = require("./travelVote/travelVoteController");

const voteRepository = new TravelVoteRepository();
const voteService = new TravelVoteService(voteRepository);
const voteController = new TravelVoteController(voteService);



// Autenticacao User
const UserPostgreRepository = require("./auth/UserAuth/UserPostgreRepository");
const AuthService = require("./auth/UserAuth/UserAuthService");
const AuthController = require("./auth/UserAuth/UserAuthController");

//Usuário
const userRepository = new UserPostgreRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);


const travelPostgreRepository = require("./travels/travelPostgreRepository");
const TravelService = require("./travels/travelService");
const TravelController = require("./travels/travelController");


// Criação de viagens
const travelRepository = new travelPostgreRepository();
const travelService = new TravelService(travelRepository);
const travelController = new TravelController(travelService);


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


app.post(
	"/api/travels/:travelId/votes",
	validadorDeOpcaoAutenticacao,
	async (request, reply) => {
		const { code, body } = await voteController.save(request, reply);
		reply.code(code).send(body);
	}
);


app.get(
	"/api/votes",
	validadorDeOpcaoAutenticacao,
	async (request, reply) => {
		const { code, body } = await voteController.index(request);
		reply.code(code).send(body);
	}
);

app.put(
	"/api/votes/:id",
	validadorDeOpcaoAutenticacao,
	async (request, reply) => {
		const { code, body } = await voteController.update(request, reply);
		reply.code(code).send(body);
	}
);


module.exports = app;
