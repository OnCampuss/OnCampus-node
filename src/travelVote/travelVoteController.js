class TravelVoteController {
  constructor(service) {
    this.service = service;
  }

  async save(request) {
    const { travelId, vou, volto, vouEvolto, naoVou } = request.body;
    const user = request.user;

    const vote = await this.service.createVote({
      travelId,
      userId: user.id,
      vou,
      volto,
      vouEvolto,
      naoVou,
    });

    return { code: 201, body: { message: "Voto registrado com sucesso!", vote } };
  }

  async index(request) {
    const { travelId } = request.query;
    const votes = await this.service.getVotesByTravel(travelId);
    return { code: 200, body: { votes } };
  }
}

module.exports = TravelVoteController;
