const TravelService = require("./travelService");

class TravelController {
	constructor(service) {
		this.service = service;
	}

	async index(request) {
		const travel = await this.service.findAllTravels();
		return { code: 200, body: { travel } };
	}

	async save(request) {
		const {
			nameViagem,
			destinoViagem,
			//statusViagem
		} = request.body;
		const user = request.user;
		//rem
		console.log(user);

		if (!nameViagem) {
			return {
				code: 400,
				body: { message: "A Viagem não pode ser criada sem um nome!!" },
			};
		}
		const travel = await this.service.createTravels({
			userId: user.id,
			nameViagem,
			destinoViagem,
			//statusViagem

		});

		return {
			code: 200,
			body: { message: "Criado viagem com sucesso!!", travel },
		};
	}
}

module.exports = TravelController;
