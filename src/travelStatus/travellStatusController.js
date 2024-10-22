class TravelStatusController {
	constructor(service) {
		this.service = service;
	}

	async index(request) {
		const travels = await this.service.findAllTravels();
		return { code: 200, body: { travels } };
	}

	async save(request) {
		const { nameViagem, destinoViagem, status } = request.body;
		const user = request.user;

		if (!nameViagem) {
			return {
				code: 400,
				body: { message: "A viagem não pode ser criada sem um nome!" },
			};
		}

		const travel = await this.service.createTravels({
			userId: user.id,
			nameViagem,
			destinoViagem,
			status,
		});

		return {
			code: 201,
			body: { message: "Viagem criada com sucesso!", travel },
		};
	}
}

module.exports = TravelStatusController;
