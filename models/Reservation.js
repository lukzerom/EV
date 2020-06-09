const mongoose = require('mongoose');

const ReservationShema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },

  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stations'
  },

  date: {
    type: Date,
    default: Date.now
  },

  timeStampFrom: {
    type: String
  },
  timeStampTo: {
    type: String
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  fullPrice: {
    type: Number
  },
  isOwnerAccepted: {
    type: Boolean,
    default: false
  },
  isOwnerRejected: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('reservation', ReservationShema);