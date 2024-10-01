const mongoose = require('mongoose'); 
const portSchema = new mongoose.Schema({
    port:String,
    chat:[[String]]
});
const port = mongoose.model('port',portSchema);
module.exports = port;