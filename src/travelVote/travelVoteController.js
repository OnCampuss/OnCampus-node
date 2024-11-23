class TravelVoteController {
  constructor(service) {
    this.service = service;
  }

  async save(request, reply) {
    try {
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
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao registrar voto", details: error.message });
    }
  }

  async index(request, reply) {
    try {
      const { travelId } = request.query;
      const votes = await this.service.getVotesByTravel(travelId);
      return { code: 200, body: { votes } };
    } catch (error) {
      return { code: 500, body: { error: "Erro ao buscar votos", details: error.message } };
    }
  }

  async update(request, reply) {
    try {
      const { id, vou, volto, vouEvolto, naoVou } = request.body;
      const vote = await this.service.updateVote({
        id,
        vou,
        volto,
        vouEvolto,
        naoVou,
      });
      return reply.status(200).send({ message: "Voto atualizado com sucesso!", vote });
    } catch (error) {
      return reply.status(400).send({ error: "Erro ao atualizar voto", details: error.message });
    }
  }
}

module.exports = TravelVoteController;
