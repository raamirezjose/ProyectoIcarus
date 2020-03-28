import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RouteMapSchema = new Schema({
  direction: Number,
  time : Number
});

export default mongoose.model('routemap', RouteMapSchema);

