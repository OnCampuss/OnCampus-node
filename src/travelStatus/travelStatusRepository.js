class TravelStatusRepository {
  constructor(db) {
    this.db = db;
  }

  async findByTravelId(travelId) {
    return await this.db.oneOrNone(
      'SELECT * FROM TravelStatus WHERE travel_id = $1',
      [travelId]
    );
  }

  async create(status) {
    await this.db.none(
      'INSERT INTO TravelStatus (id, travel_id, vou, volto, vouEVolto, naoVou) VALUES (${id}, ${travelId}, ${vou}, ${volto}, ${vouEVolto}, ${naoVou})',
      status
    );
  }
}

module.exports = TravelStatusRepository;
