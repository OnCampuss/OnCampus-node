class TravelVoteController {
  constructor(service) {
    this.service = service;
  }

  async save(request, reply) {
    const { vou, volto, vouEvolto, naoVou } = request.body;
    const user = request.user;
    const { travelId } = request.params;
    const vote = await this.service.createVote({
      travelId,
      userId: user.id,
      vou,
      volto,
      vouEvolto,
      naoVou,
    });

    return reply.status(201).send({ message: "Voto registrado com sucesso!", vote });
  }

  async index(request, reply) {
    const { travelId } = request.query;
    const votes = await this.service.getVotesByTravel(travelId);
    return reply.status(200).send({ votes });
  }

  async update(request, reply) {
    const { id, vou, volto, vouEvolto, naoVou } = request.body;
    const vote = await this.service.updateVote({
      id,
      vou,
      volto,
      vouEvolto,
      naoVou,
    });

    return reply.status(200).send({ message: "Voto atualizado com sucesso!", vote });
  }
}

module.exports = TravelVoteController;
