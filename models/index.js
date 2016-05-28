import mongoose from 'mongoose';
import {MODELS} from './configuration';

// import schemas
import userSchema from './user';
import noteSchema from './note';
import groupSchema from './group';

// register models
mongoose.model('User', userSchema);
mongoose.model('Note', noteSchema);
mongoose.model('Group', groupSchema);

export function getModel(modelName) {
  if(MODELS.indexOf(modelName) != -1) {
    return mongoose.model(modelName);
  }else {
    throw new Error(`Make sure ${modelName} is initialized`);
  }
};