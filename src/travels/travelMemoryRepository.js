const Travel = require("./travel");

class TravelMemoryRepository {
	constructor() {
		this.travels = [];
	}

	findAll() {
		return this.travels;
	}

	create(travel) {
		this.travels.push(travel);
	}
}

module.exports = TravelMemoryRepository;
