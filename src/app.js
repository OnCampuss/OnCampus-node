const fastify = require("fastify");


const TravelStatusRepository = require("../src/travelStatus/travelStatusRepository");
const TravelStatusService = require("../src/travelStatus/travelStatus");

const statusRepository = new TravelStatusRepository();
const statusService = new TravelStatusService(statusRepository);


// IMPORT DOS USUARIOS
const UserPostgreRepository = require("./auth/UserAuth/UserPostgreRepository");
const AuthService = require("./auth/UserAuth/UserAuthService");
const AuthController = require("./auth/UserAuth/UserAuthController");

const userRepository = new UserPostgreRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);


//IMPORT DOS ADMINS
const AdminAuthService = require("./auth/AdminAuth/AdminAuthService")
const AdminController = require("./auth/AdminAuth/AdminController")
const AdminPostgreRepository = require("./auth/AdminAuth/AdminPostgreRepository")

const adminRepository = new AdminPostgreRepository();
const adminAuthService = new AdminAuthService(adminRepository);
const adminController = new AdminController(adminAuthService);


const travelPostgreRepository = require("./travels/travelPostgreRepository");
const TravelService = require("./travels/travelService");
const TravelController = require("./travels/travelController");

const app = fastify({ logger: true });

const travelRepository = new travelPostgreRepository();
const travelService = new TravelService(travelRepository);
//Vinculado ao método de listar Viagens
const travelController = new TravelController(travelService);


const validadorTokenUsuario = {
	//PreHandler: Faz a verificação do Token do usuário.
	preHandler: async (request, reply) => {
		//Bearer == Token do usuário.
		const token = request.headers.authorization?.replace(/^Bearer /, "");
		if (!token)
			reply
				.code(401)
				.send({ message: "Não autorizado!!   DEBUG: Faltando Token" });

		const user = await authService.verificaUserToken(token);
		if (!user)
			reply.code(404).send({ message: "Não autorizado!! Token Inválido" });
		request.user = user;
	}
};


const validadorTokenAdmin = {
	//PreHandler: Faz a verificação do Token do usuário.
	preHandler: async (request, reply) => {
		//Bearer == Token do usuário.
		const token = request.headers.authorization?.replace(/^Bearer /, "");
		if (!token)
			reply
				.code(401)
				.send({ message: "Não autorizado!!   DEBUG: Faltando Token" });

		const admin = await adminAuthService.verificaAdminToken(token);
		if (!admin)
			reply.code(404).send({ message: "Não autorizado!! Token Inválido" });
		request.user = admin;
	}
};

// Método que faz apenas um teste se a aplicação está rodando na porta certa
app.get("/hello", (request, reply) => {
	reply.send({ message: "Aplicação rodando Corretamente!!  :" });
});


// Criação de usuário ADM
app.post("/api/auth/AdminRegister", async (request, reply) => {
	const { code, body } = await adminAuthService.register(request);
	reply.code(code).send(body);
});

app.post("/api/auth/Adminlogin", async (request, reply) => {
	const { code, body } = await adminController.login(request);
	reply.code(code).send(body);
});


// Método no qual lista todas as viagens cadastradas
app.get("/api/FindTravels", validadorTokenUsuario, async (request, reply) => {
	const { code, body } = await travelController.index(request);
	reply.code(code).send(body);
});

// Método no qual faz a criação da viagens
app.post("/api/CreateTravels", validadorTokenUsuario, async (request, reply) => {
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
