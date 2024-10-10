const Travel = require("./travel");
const create = require("./travelPostgreRepository");

class TravelService {
	constructor(repository) {
		this.repository = repository;
	}

	async findAllTravels() {
		return await this.repository.findAll();
	}

	async createTravels({
		userId,
		idViagem,
		nameViagem,
		voltoInViagem,
		vouInViagem,
		vouAndVoltoInViagem,
		destinoViagem,
	}) {
		const newTravels = new Travel({
			userId,
			idViagem,
			nameViagem,
			voltoInViagem,
			vouInViagem,
			vouAndVoltoInViagem,
			destinoViagem,
		});

		//Método para fazer a validadação se a viagem já está criada
		const allTravels = await this.repository.findAll()

		const validadorReservaViagens = allTravels.find((Travel) => {
			return Travel.idViagem === newTravels.idViagem;
		});

		if (validadorReservaViagens) {
			throw new Error("A viagem com esse ID já está criada.");
		}

		await this.repository.create(newTravels);
		return newTravels;
	}
}

module.exports = TravelService;
