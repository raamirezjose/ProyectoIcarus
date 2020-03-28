import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RouteMapSchema = new Schema({
  direction: Number,
  date :Date
});

export default mongoose.model('routemap', RouteMapSchema);

