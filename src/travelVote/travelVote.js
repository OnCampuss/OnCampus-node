const { v4: uuidV4 } = require("uuid");

class TravelVote {
  constructor({ id, travelId, userId, vou, volto, vouEvolto, naoVou }) {
    this.id = id ?? uuidV4();
    this.travelId = travelId;
    this.userId = userId;
    this.vou = vou ?? false;
    this.volto = volto ?? false;
    this.vouEvolto = vouEvolto ?? false;
    this.naoVou = naoVou ?? false;
  }
}

module.exports = TravelVote;