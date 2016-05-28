import mongoose from 'mongoose';
import {toJSONTransform, ObjectId} from './configuration';

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  groups: [{type: ObjectId, ref: 'Group'}]
});

userSchema.set('toJSON', {transform: toJSONTransform});

export default userSchema;