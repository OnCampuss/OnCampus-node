const db = require("../database");
const Travel = require("./travel");

class TravelPostgreRepository {
	constructor() {
		this.db = db
	}

	async findAll() {
		const viagensCriadas = await this.db.manyOrNone('SELECT id, name_viagem AS "nameViagem", volto_in_viagem AS "voltoInViagem", vou_in_viagem AS "vouInViagem", vou_and_volto_viagem AS "vouAndVoltoInViagem", destinoViagem, user_id AS "userId" FROM Travels');
		return viagensCriadas.map(travel => new Travel(travel));
	}


	async create(travel) {
		await this.db.none("INSERT INTO Travels (id,  name_viagem, volto_in_viagem, vou_in_viagem, vou_and_volto_viagem, destinoViagem, user_id) VALUES (${id}, ${nameViagem}, ${voltoInViagem}, ${vouInViagem}, ${vouAndVoltoInViagem}, ${destinoViagem}, ${userId})", travel);
	}


}

module.exports = TravelPostgreRepository;
