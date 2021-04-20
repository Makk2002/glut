const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}


const xyzowiczeSchema = mongoose.Schema({
    guildId: reqString,
	kanal: reqString,
	wlasc: reqString,
    klanowicz: reqString,
  })

module.exports = mongoose.model('xyzowicze', xyzowiczeSchema)