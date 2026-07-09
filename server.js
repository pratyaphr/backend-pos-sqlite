require("dotenv").config();

const app = require("./src/app");

const migrate = require("./database/migrate");

const PORT = process.env.PORT || 5000;

migrate();

app.listen(PORT, () => {
  console.log(`🚀 POS Backend Running : http://localhost:${PORT}`);
});
