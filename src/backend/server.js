const app = require("./app");

const port = parseInt(process.env.PORT, 10) || process.env.API_PORT;

app.listen(process.env.PORT, () => {
  console.log(`Backend api available at ${process.env.API_PATH}`);
});
