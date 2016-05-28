import {getModel} from '../models/index';
const User = getModel('User');

export async function login(ctx, next) {
  const {username, password} = ctx.request.query;
  try {
    const user = await User.findOne({name: username, password: password});
    if(user) {
      ctx.body = {
        code: 1
      };
    }else {
      ctx.body = {
        code: 0,
        reason: 'Username or password is error'
      };
    }
  }catch(e) {
    console.log(e);
    ctx.body = {
      code: 0,
      reason: e.message
    };
  }
};

export async function signup(ctx, next) {
  const userInfo = ctx.request.body;
  const existUser = await User.findOne({name: userInfo.username});
  if(!existUser) {
    try {
      const newUser = await User.create({name: userInfo.username, password: userInfo.password});
    }catch(e) {
      console.log(e);
    }
    ctx.body = {
      code: 1
    };
  }else {
    ctx.body = {
      code: 0,
      reason: 'This name is used'
    }
  }
};

export async function searchUser(ctx, next) {
  const query = ctx.request.query;
  const username = query.username;
  const userInfo = await User.findOne({name: username});
  if(userInfo) {
    ctx.body = {
      code: 1,
      userInfo: userInfo
    };
  }else {
    ctx.body = {
      code: 0,
      reason: 'User is not exist'
    };
  }
};