const TravelVote = require("./travelVote");

class TravelVoteService {
  constructor(repository) {
    this.repository = repository;
  }

  async createVote({ travelId, userId, vou, volto, vouEvolto, naoVou }) {
    const newVote = new TravelVote({
      travelId,
      userId,
      vou,
      volto,
      vouEvolto,
      naoVou,
    });

    await this.repository.create(newVote);
    return newVote;
  }

  async getVotesByTravel(travelId) {
    return await this.repository.findByTravel(travelId);
  }
}

module.exports = TravelVoteService;
