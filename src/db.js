const { Prisma } = require('prisma-binding');

//  Connect with prisma db for yoga
const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false
})

module.exports = db;