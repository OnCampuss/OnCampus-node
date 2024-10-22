const TravelStatus = require("./travelStatus");

class TravelStatusService {
  constructor(repository) {
    this.repository = repository;
  }

  async createStatus(travelId, statusData) {
    const status = new TravelStatus({ travelId, ...statusData });
    await this.repository.create(status);
    return status;
  }

  async findByTravelId(travelId) {
    const status = await this.repository.findByTravelId(travelId);
    if (!status) {
      throw new Error("Status não encontrado para esta viagem.");
    }
    return status;
  }
}

module.exports = TravelStatusService;
