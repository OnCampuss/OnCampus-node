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
		} = request.body;
		const user = request.user;

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
		});

		return {
			code: 200,
			body: { message: "Criado viagem com sucesso!!", travel },
		};
	}


	async delete(request) {
		const { id } = request.params;

		try {
			const result = await this.service.deleteTravels(id);
			return { code: 200, body: result };
		} catch (error) {
			return { code: 400, body: { message: error.message } };
		}
	}



}

module.exports = TravelController;
