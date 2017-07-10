var mongoose =　require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  user: String,
  group: String,
  text: String,
  time: String
})

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;