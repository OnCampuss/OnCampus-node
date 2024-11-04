const { v4: uuidV4 } = require("uuid");

class Travel {
	constructor({
		id,
		userId,
		nameViagem,
		destinoViagem,
	}) {
		this.id = id ?? uuidV4();
		this.userId = userId;
		this.nameViagem = nameViagem;
		this.destinoViagem = destinoViagem;
	}
}

module.exports = Travel;
