const TravelVote = require("./travelVote");

class TravelVoteService {
  constructor(repository) {
    this.repository = repository;
  }

  async createVote({ travelId, userId, vou, volto, vouevolto, naoVou }) {
    const newVote = new TravelVote({
      travelId,
      userId,
      vou,
      volto,
      vouevolto,
      naoVou,
    });

    await this.repository.create(newVote);
    return newVote;
  }

  async getVotesByTravel(travelId) {
    return await this.repository.findByTravel(travelId);
  }

  async updateVote({ id, vou, volto, vouevolto, naoVou }) {
    // Aqui, estamos pegando os valores do voto a ser atualizado
    const updatedVote = new TravelVote({
      id,
      vou,
      volto,
      vouevolto,
      naoVou,
    });

    // Chamando o repositório para realizar a atualização
    await this.repository.update(updatedVote);
    return updatedVote;
  }
}

module.exports = TravelVoteService;
