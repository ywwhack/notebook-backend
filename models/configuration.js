import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const MODELS = ['User', 'Note', 'Group'];

export {ObjectId, MODELS};
export function toJSONTransform(doc, ret, options) {
  delete ret._id;
  delete ret.__v;
};