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
		nameViagem,
		voltoInViagem,
		vouInViagem,
		vouAndVoltoInViagem,
		destinoViagem,
	}) {
		const newTravels = new Travel({
			userId,
			nameViagem,
			voltoInViagem,
			vouInViagem,
			vouAndVoltoInViagem,
			destinoViagem,
		});

		//Método para fazer a validadação se a viagem já está criada
		const allTravels = await this.repository.findAll()

		const validadorReservaViagens = allTravels.find((Travel) => {
			return Travel.nameViagem === newTravels.nameViagem;
		});

		if (validadorReservaViagens) {
			throw new Error("A viagem com esse nome já está criada.");
		}

		await this.repository.create(newTravels);
		return newTravels;
	}



	async deleteTravels(id) {
		const allTravels = await this.repository.findAll();
		const travel = allTravels.find((travel) => travel.id === id);
		if (!travel) {
			throw new Error("Viagem não encontrada.");
		}
		await this.repository.delete(id);
		return { message: "Viagem deletada com sucesso." };
	}





}

module.exports = TravelService;
