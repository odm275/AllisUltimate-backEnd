const bcrypt = require('bcryptjs'); //hash password, standard technique
const jwt = require('jsonwebtoken');
const Mutation = {
    async createBlog(parent,args,ctx,info){
        //  TODO: Check if they are logged in
        const item = await ctx.db.mutation.createBlog({
            data:{
                ...args
            }
        },info)
        return item;
    },
    async signup(parent, args, ctx, info){
        args.email = args.email.toLowerCase();
        const password = await bcrypt.hash(args.password,10);

        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: { set: ['USER'] },
            }
        }, info);
        //  create the JWT token for them
        const token = jwt.sign({userId: user.id},process.env.APP_SECRET);
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, //   1 year cookie
        });
        return user;
    }


};

module.exports = Mutation;
