import mongoose from 'mongoose';
import {toJSONTransform, ObjectId} from './configuration';

const groupSchema = mongoose.Schema({
  name: String,
  notes: [{type: ObjectId, ref: 'Note'}],
  members: [{type: ObjectId, ref: 'User'}]
});

groupSchema.set('toJSON', {transform: toJSONTransform});

export default groupSchema;