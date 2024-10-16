const db = require("../database");
const Travel = require("./travel");

class TravelPostgreRepository {
	constructor() {
		this.db = db
	}

	async findAll() {
		const viagensCriadas = await this.db.manyOrNone('SELECT id, name_viagem AS "nameViagem", destinoViagem, user_id AS "userId" FROM Travels');
		return viagensCriadas.map(travel => new Travel(travel));
	}


	async create(travel) {
		await this.db.none("INSERT INTO Travels (id,name_viagem, destinoViagem, user_id) VALUES (${id}, ${nameViagem}, ${destinoViagem}, ${userId})", travel);
	}


}

module.exports = TravelPostgreRepository;
