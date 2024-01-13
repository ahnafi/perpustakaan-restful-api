import { prisma } from "../src/app/database.js";

export const deleteAllUsers = async () => {
  return prisma.user.deleteMany({
    where: {
      name: "test",
    },
  });
};
