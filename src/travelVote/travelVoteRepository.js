const db = require("../database");
const TravelVote = require("./travelVote");

class TravelVoteRepository {
  constructor() {
    this.db = db;
  }

  async create(travelVote) {
    await this.db.none(
      "INSERT INTO TravelVotes (id, travel_id, user_id, vou, volto, vouevolto, nao_vou) VALUES (${id}, ${travelId}, ${userId}, ${vou}, ${volto}, ${vouevolto}, ${naoVou})",
      travelVote
    );
  }

  async findByTravel(travelId) {
    const query = "SELECT * FROM TravelVotes";
    return await db.manyOrNone(query, [travelId]);
  }



  async update(travelVote) {
    await this.db.none(
      "UPDATE TravelVotes SET vou = ${vou}, volto = ${volto}, vouevolto = ${vouevolto}, nao_vou = ${naoVou} WHERE id = ${id}",
      travelVote
    );
  }
}

module.exports = TravelVoteRepository;
