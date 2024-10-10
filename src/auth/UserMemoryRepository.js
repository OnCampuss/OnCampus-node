class UserMemoryRepository {
	constructor() {
		this.users = [];
	}

	// Realiza a busca do usuário criado com o e-mail
	findByEmail(email) {
		return this.users.find((user) => email === user.email);
	}

	//Push -- Insere novos usuários "Criação de usuários"
	save(user) {
		this.users.push(user);
	}
}

module.exports = UserMemoryRepository;
