const mongoose = require('mongoose');

const mongoose_connect_string = process.env.MONGODB_URI || 'mongodb://localhost/googlebooks';
console.log(mongoose_connect_string);

mongoose.connect(mongoose_connect_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
