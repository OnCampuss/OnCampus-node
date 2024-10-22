class TravelService {
	constructor(travelRepository, statusService) {
		this.travelRepository = travelRepository;
		this.statusService = statusService;
	}

	async findAllTravels() {
		return await this.travelRepository.findAll();
	}

	async createTravels({ userId, nameViagem, destinoViagem, statusData }) {
		const newTravel = new Travel({ userId, nameViagem, destinoViagem });

		// Verificar se a viagem já existe
		const allTravels = await this.travelRepository.findAll();
		const viagemExistente = allTravels.find(t => t.nameViagem === newTravel.nameViagem);

		if (viagemExistente) {
			throw new Error("A viagem com esse nome já está criada.");
		}

		// Criar a viagem no banco
		await this.travelRepository.create(newTravel);

		// Criar o status para a viagem recém-criada
		await this.statusService.createStatus(newTravel.id, statusData);

		return newTravel;
	}
}

module.exports = TravelService;
