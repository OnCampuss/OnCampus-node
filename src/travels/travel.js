const { v4: uuidV4 } = require("uuid");

// descrição do que precisa para a aplicação....
// id,idViagem, nameViagem, voltoInViagem,vouInViagem, vouAndVoltoInViagem, destinoViagem, turnoViagem

class Travel {
	constructor({
		id,
		userId,
		idViagem,
		nameViagem,
		voltoInViagem,
		vouInViagem,
		vouAndVoltoInViagem,
		destinoViagem,
	}) {
		this.id = id ?? uuidV4();
		this.userId = userId;
		this.idViagem = idViagem;
		this.nameViagem = nameViagem;
		this.voltoInViagem = voltoInViagem;
		this.vouInViagem = vouInViagem;
		this.vouAndVoltoInViagem = vouAndVoltoInViagem;
		this.destinoViagem = destinoViagem;
	}
}

module.exports = Travel;
