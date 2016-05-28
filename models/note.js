import mongoose from 'mongoose';
import {toJSONTransform, ObjectId} from './configuration';

const noteSchema = mongoose.Schema({
  content: String,
  uid: {type: ObjectId, ref: 'User'},
  images: [String]
});

noteSchema.set('toJSON', {transform: toJSONTransform});

export default noteSchema;