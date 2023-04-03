import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

  const person_Adam = await prisma.person.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        name: 'Adam One',
        code: 'M-0001'
  }})
  const person_Hawwa = await prisma.person.upsert({
    where: { id: 2 },
    update: {},
    create: {
        id: 2,
        name: 'Adam Two',
        code: 'M-0002'
  }})
  const person_Ibrahim = await prisma.person.upsert({
    where: { id: 3 },
    update: {},
    create: {
        id: 3,
        name: 'Ibrahim Three',
        code: 'M-0003'
  }})
  const person_Hajar = await prisma.person.upsert({
    where: { id: 4 },
    update: {},
    create: {
        id: 4,
        name: 'Hajar Four',
        code: 'M-0004'
  }})
  const person_Ismail = await prisma.person.upsert({
    where: { id: 5 },
    update: {},
    create: {
        id: 5,
        name: 'Ismail Five',
        code: 'M-0005'
  }})
  const person_Aminath = await prisma.person.upsert({
    where: { id: 6 },
    update: {},
    create: {
        id: 6,
        name: 'Aminath Six',
        code: 'M-0006'
  }})
  const person_Mohamed = await prisma.person.upsert({
    where: { id: 7 },
    update: {},
    create: {
        id: 7,
        name: 'Mohamed Seven',
        code: 'M-0007'
  }})

  const cargoDimensionCategory_Tiny = await prisma.cargoDimensionCategory.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        name: 'Tiny',
        width: 10,
        depth: 10,
        height: 10,
        unitsOfSpace: 10**3
  }})
  const cargoDimensionCategory_Small = await prisma.cargoDimensionCategory.upsert({
    where: { id: 2 },
    update: {},
    create: {
        id: 2,
        name: 'Small',
        width: 15,
        depth: 15,
        height: 15,
        unitsOfSpace: 15**3
  }})
  const cargoDimensionCategory_SmallA = await prisma.cargoDimensionCategory.upsert({
    where: { id: 3 },
    update: {},
    create: {
        id: 3,
        name: 'SmallA',
        width: 10,
        depth: 20,
        height: 15,
        unitsOfSpace: 10 * 20 * 15
  }})
  const cargoDimensionCategory_smallB = await prisma.cargoDimensionCategory.upsert({
    where: { id: 4 },
    update: {},
    create: {
        id: 4,
        name: 'SmallB',
        width: 15,
        depth: 10,
        height: 20,
        unitsOfSpace: 15 * 10 * 20
  }})
  const cargoDimensionCategory_SmallC = await prisma.cargoDimensionCategory.upsert({
    where: { id: 5 },
    update: {},
    create: {
        id: 5,
        name: 'SmallC',
        width: 20,
        depth: 15,
        height: 10,
        unitsOfSpace: 20 * 15 * 10
  }})
  const cargoDimensionCategory_Medium = await prisma.cargoDimensionCategory.upsert({
    where: { id: 6 },
    update: {},
    create: {
        id: 6,
        name: 'Medium',
        width: 20,
        depth: 20,
        height: 20,
        unitsOfSpace: 20**3
  }})
  const cargoDimensionCategory_Large = await prisma.cargoDimensionCategory.upsert({
    where: { id: 7 },
    update: {},
    create: {
        id: 7,
        name: 'Large',
        width: 25,
        depth: 25,
        height: 25,
        unitsOfSpace: 25**3
  }})
  const cargoDimensionCategory_X_Large = await prisma.cargoDimensionCategory.upsert({
    where: { id: 8 },
    update: {},
    create: {
        id: 8,
        name: 'X-Large',
        width: 35,
        depth: 35,
        height: 35,
        unitsOfSpace: 35**3
  }})


  await prisma.cargo.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        description: 'Suitcase',
        cargoDimensionCategoryId: 7,
        cargoDimensions: '23 x 23 x 15',
        cargoWeight: 23.7
  }})
  await prisma.cargo.upsert({
    where: { id: 2 },
    update: {},
    create: {
        id: 2,
        description: 'Box of Electrical Equipment',
        cargoDimensionCategoryId: 7,
        cargoDimensions: '30 * 30 * 30',
        cargoWeight: 30
  }})
  await prisma.cargo.upsert({
    where: { id: 3 },
    update: {},
    create: {
        id: 3,
        description: 'Office Folders Of Records',
        cargoDimensionCategoryId: 2,
        cargoDimensions: '2 * 8 * 12',
        cargoWeight: 3
  }})
  await prisma.cargo.upsert({
    where: { id: 4 },
    update: {},
    create: {
        id: 4,
        description: 'Box O Chocs',
        cargoDimensionCategoryId: 1,
        cargoDimensions: '5 x 8 x 5',
        cargoWeight: 1.5
  }})
  await prisma.cargo.upsert({
    where: { id: 5 },
    update: {},
    create: {
        id: 5,
        description: 'Backpack',
        cargoDimensionCategoryId: 6,
        cargoDimensions: '20 x 15 x 10',
        cargoWeight: 18.75
  }})
  await prisma.cargo.upsert({
    where: { id: 6 },
    update: {},
    create: {
        id: 6,
        description: 'Box of Files',
        cargoDimensionCategoryId: 6,
        cargoDimensions: '17 x 15 x 17',
        cargoWeight: 15.5
  }})



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