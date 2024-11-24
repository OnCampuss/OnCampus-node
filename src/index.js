const app = require("./app");

const PORT = process.env.PORT || 2000;

const start = () => {
	app.listen({ port: PORT, host: "0.0.0.0" });
	app.log.info("Server is running on http://localhost:" + PORT);
};


start();
