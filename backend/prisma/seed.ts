import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

  const status_pending = await prisma.status.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        name: 'Pending',
        isActive: true
  }})
  const status_completed = await prisma.status.upsert({
    where: { id: 2 },
    update: {},
    create: {
        id: 2,
        name: 'Completed',
        isActive: false
  }})
  const status_cancelled = await prisma.status.upsert({
    where: { id: 3 },
    update: {},
    create: {
        id: 3,
        name: 'Cancelled',
        isActive: false
  }})
  const status_rejected = await prisma.status.upsert({
    where: { id: 4 },
    update: {},
    create: {
        id: 4,
        name: 'Rejected',
        isActive: false
  }})
//   const bob = await prisma.user.upsert({
//     where: { email: 'bob@prisma.io' },
//     update: {},
//     create: {
//       email: 'bob@prisma.io',
//       name: 'Bob',
//       posts: {
//         create: [
//           {
//             title: 'Follow Prisma on Twitter',
//             content: 'https://twitter.com/prisma',
//             published: true,
//           },
//           {
//             title: 'Follow Nexus on Twitter',
//             content: 'https://twitter.com/nexusgql',
//             published: true,
//           },
//         ],
//       },
//     },
//   })
//   console.log({ alice, bob })
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })