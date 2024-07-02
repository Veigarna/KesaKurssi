const app = require('./app'); // varsinainen Express-sovellus
require('dotenv').config();

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
