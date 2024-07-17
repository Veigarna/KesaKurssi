const app = require('./app'); // varsinainen Express-sovellus
const config = require('./utils/config');
require('dotenv').config();

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
