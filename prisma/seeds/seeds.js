const { PrismaClient } = require("@prisma/client");
require('dotenv').config({ path: '../../.env' });
const permisionGroupData = require('./permissionGroup/permissionGroup.json')
const permisionData = require('./permissionGroup/permission.json')
const prisma = new PrismaClient();

const load = async () => {
  try {

    await prisma.users.deleteMany();
    console.log("Deletado dados na tabela users");

    await prisma.group.deleteMany();
    console.log("Deletado dados na tabela group");

    await prisma.group.createMany({
      data: [
        { id: 1, description: "Administradores", superior: 1 },
        { id: 2, description: "Usuarios", superior: 1 },
      ],
    });
    console.log("Adicionado dados na tabela group");

    await prisma.users.create({
      data: {
        id:1,
        name: "admin",
        password: process.env.ADMIN_PASSWORD,
        address: "rua dos admin",
        neighborhood: "parque do lago",
        county: "varzea grande",
        groupId: 1,
        email: "admin@admin.com",
        phone: "36851060",
      },
    });
    console.log("Adicionado dados na tabela users"); 


await prisma.permission.createMany({
  data:permisionData
})

await prisma.permissionGroup.createMany({
  data:permisionGroupData
})

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
