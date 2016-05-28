'use strict';
import Koa from 'koa';
import koaRouter from 'koa-router';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import multer from 'koa-multer';
import mongoose from 'mongoose';

// routes
import {getAllGroups, getGroupDetail, addNoteToGroup, addMemberToGroup, createGroup} from './routes/group';
import {login, signup, searchUser} from './routes/user';

// mongoose.connect('mongodb://localhost/notebook');

const app = new Koa();
const upload = multer({dest: 'uploads/'});
const router = koaRouter();

router.get('/get_all_groups', getAllGroups);
router.get('/get_group_detail', getGroupDetail);
router.post('/add_note_to_group', upload.any(), addNoteToGroup);
router.post('/add_group_member', addMemberToGroup);
router.post('/create_group', createGroup);

router.post('/upload', upload.any(), async (ctx, next) => {
  console.log(ctx.req.files);
  console.log(ctx.req.body);
  ctx.body = {
    code: 1
  };
});

router.get('/login', login);
router.get('/search_user', searchUser);
router.post('/signup', signup);

router.get('/', async (ctx, next) => {
  ctx.body = 'hello world';
});

app.use(serve('.'));
app.use(bodyParser());
app.use(router.routes());

app.listen(3000, () => {
  console.log('listending on port 3000');
});