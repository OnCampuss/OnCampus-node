const { v4: uuidV4 } = require("uuid");

class TravelVote {
  constructor({ id, travelId, userId, vou, volto, vouevolto, naoVou }) {
    this.id = id ?? uuidV4();
    this.travelId = travelId;
    this.userId = userId;
    this.vou = vou;
    this.volto = volto;
    this.vouevolto = vouevolto;
    this.naoVou = naoVou;
  }
}

module.exports = TravelVote;