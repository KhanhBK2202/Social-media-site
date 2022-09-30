const meRouter = require('./me');
const userRouter = require('./user');
const articleRouter = require('./article');
const tagRouter = require('./tag');
const authRouter = require('./auth');
const userAuthRouter = require('./userAuth');
function route(app) {
    app.use('/me', meRouter);
    app.use('/user', userRouter);
    app.use('/article', articleRouter);
    app.use('/tag', tagRouter);
    app.use('/auth', authRouter);
    app.use('/userAuth', userAuthRouter);
}
module.exports = route;
