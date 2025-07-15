import mongoose from 'mongoose';

const unpaidUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rentAmount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  addedToUnpaidList: {
    type: Date,
    default: Date.now,
  },
},
{timestamps:true});

const UnpaidUser = mongoose.model('UnpaidUser', unpaidUserSchema);

export default UnpaidUser;
