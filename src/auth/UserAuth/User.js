const { v4: uuidV4 } = require("uuid");

//CPF, REGISTRO ACADEMICO, SEMESTRE

class User {
	constructor({ id, name, email, password, }) {
		this.id = id ?? uuidV4();
		this.name = name;
		this.email = email;
		this.password = password;
	}
}

module.exports = User;