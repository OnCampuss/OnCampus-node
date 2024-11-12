const { v4: uuidV4 } = require("uuid");

class TravelVote {
  constructor({ id, travelId, userId, vou, volto, vouEvolto, naoVou }) {
    this.id = id ?? uuidV4();
    this.travelId = travelId;
    this.userId = userId;
    this.vou = vou;
    this.volto = volto;
    this.vouEvolto = vouEvolto;
    this.naoVou = naoVou;
  }
}

module.exports = TravelVote;