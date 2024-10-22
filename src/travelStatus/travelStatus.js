const { v4: uuidV4 } = require("uuid");

class travelStatus {
  constructor({
    id,
    userId,
    nameViagem,
    destinoViagem,
    statusId = null,
  }) {
    this.id = id ?? uuidV4();
    this.userId = userId;
    this.nameViagem = nameViagem;
    this.destinoViagem = destinoViagem;
    this.statusId = statusId;
  }
}

module.exports = travelStatus;
