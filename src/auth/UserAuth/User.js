const { v4: uuidV4 } = require("uuid");

class User {
	constructor({ id, name, email, password, cpf, semestre, curso, matricula
	}) {
		this.id = id ?? uuidV4();
		this.name = name;
		this.email = email;
		this.password = password;
		this.cpf = cpf;
		this.semestre = semestre;
		this.curso = curso;
		this.matricula = matricula;
	}
}

module.exports = User;
