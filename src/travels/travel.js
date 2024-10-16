const { v4: uuidV4 } = require("uuid");

// descrição do que precisa para a aplicação....
// id,idViagem, nameViagem, voltoInViagem,vouInViagem, vouAndVoltoInViagem, destinoViagem, turnoViagem

class Travel {
	constructor({
		id,
		userId,
		nameViagem,
		//statusViagem = "Vou"
		destinoViagem,
	}) {
		this.id = id ?? uuidV4();
		this.userId = userId;
		this.nameViagem = nameViagem;
		//statusViagem
		this.destinoViagem = destinoViagem;
	}
}

module.exports = Travel;
