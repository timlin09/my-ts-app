import app from './App';

require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Express is listening on https://localhost:${PORT}`);
});
