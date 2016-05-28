import bfs from 'babel-fs';
import {getModel} from '../models/index';
const User = getModel('User');
const Group = getModel('Group');
const Note = getModel('Note');

export async function getAllGroups(ctx, next) {
  const {username} = ctx.request.query;
  try {
    const user = await User
      .findOne({name: username})
      .populate('groups', 'name');
    const groupnames = user.groups.map((group) => { return {name: group.name, id: group.id}; });
    ctx.body = {
      code: 1,
      groups: groupnames
    };
  }catch(e) {
    console.log(e);
    ctx.body = {
      code: 0,
      reason: e.message
    };
  }
};

export async function getGroupDetail(ctx, next) {
  const {groupId} = ctx.request.query;
  try {
    const group = await Group
      .findById(groupId)
      .populate({
        path: 'notes',
        populate: { path: 'uid' }
      })
      .populate('members');
    const notes = group.notes.map(note => { return {content: note.content, ownername: note.uid.name, images: note.images} });
    const members = group.members.map(member => member.name);
    
    ctx.body = {
      code: 1,
      data: {
        notes: notes,
        members: members
      }
    };
  }catch(e) {
    console.log(e);
    ctx.body = {
      code: 0,
      reason: e.message
    };
  }
};

export async function addNoteToGroup(ctx, next) {
  const {noteContent, groupId, username} = ctx.req.body;
  const files = ctx.req.files;
  try {
    const note = Note({content: noteContent});
    const group = await Group.findById(groupId);
    const user = await User.findOne({name: username});
    note.uid = user._id;
    group.notes.push(note._id);
    // Rename origin filename to .jpg filename, and add image names to note
    for(let file of files) {
      await bfs.rename(file.path, `${file.path}.jpg`);
      note.images.push(`http://localhost:3000/${file.path}.jpg`);
    }
    await note.save();
    await group.save();
    
    ctx.body = {
      code: 1
    };
  }catch(e) {
    console.log(e);
    ctx.body = {
      code: 0,
      reason: e.message
    };
  }
};

export async function addMemberToGroup(ctx, next) {
  const {membername, groupId} = ctx.request.body;
  try {
    const member = await User.findOne({name: membername});
    const group = await Group.findById(groupId);
    group.members.push(member._id);
    member.groups.push(group._id);
    await group.save();
    await member.save();
    
    ctx.body = {
      code: 1
    };
  }catch(e) {
    console.log(e);
    ctx.body = {
      code: 0,
      reason: e.message
    };
  }
};

export async function createGroup(ctx, next) {
  const {username, groupname} = ctx.request.body;
  try {
    const user = await User.findOne({name: username});
    const group = await Group({name: groupname});
    group.members.push(user._id);
    user.groups.push(group._id);
    await group.save();
    await user.save();

    ctx.body = {
      code: 1
    };
  }catch(e) {
    console.log(e);
    ctx.body = {
      code: 0,
      reason: e.message
    };
  }
};