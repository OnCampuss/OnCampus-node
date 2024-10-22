class TravelPostgreRepository {
  constructor() {
    this.db = require("../database");
  }

  async findAll() {
    const viagensCriadas = await this.db.manyOrNone(`
			SELECT 
				t.id, 
				t.name_viagem AS "nameViagem", 
				t.destinoViagem, 
				t.user_id AS "userId", 
				ts.id AS "statusId"
			FROM Travels t
			LEFT JOIN TravelStatus ts ON t.id = ts.travel_id
		`);
    return viagensCriadas.map(travel => new Travel(travel));
  }

  async create(travel) {
    await this.db.none(
      `INSERT INTO Travels (id, name_viagem, destinoViagem, user_id) 
			 VALUES (${travel.id}, ${travel.nameViagem}, ${travel.destinoViagem}, ${travel.userId})`,
      travel
    );
  }
}

module.exports = TravelPostgreRepository;
