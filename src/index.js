const app = require("./app");

const PORT = process.env.PORT || 3000;

const start = () => {
	app.listen({ port: PORT });
	app.log.info("Server is running on http://localhost:" + PORT);
};

start();
