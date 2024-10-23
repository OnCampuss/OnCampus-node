const db = require("../database");
const TravelVote = require("./travelVote");

class TravelVoteRepository {
  constructor() {
    this.db = db;
  }

  async create(travelVote) {
    await this.db.none(
      "INSERT INTO TravelVotes (id, travel_id, user_id, vou, volto, vou_e_volto, nao_vou) VALUES (${id}, ${travelId}, ${userId}, ${vou}, ${volto}, ${vouEvolto}, ${naoVou})",
      travelVote
    );
  }

  async findByTravel(travelId) {
    const query = "SELECT * FROM TravelVotes WHERE travel_id = $1";
    const votes = await this.db.manyOrNone(query, [travelId]);
    return votes.map(vote => new TravelVote(vote));
  }

}

module.exports = TravelVoteRepository;
