import { prisma } from "./../src/app/database.js";

afterEach(async () => {
  await prisma.book.deleteMany({
    where: {
      title: "test",
    },
  });
  await prisma.category.deleteMany({
    where: {
      categoryName: "test",
    },
  });
});

test("should ", async () => {
  const book = await prisma.book.create({
    data: {
      title: "test",
      author: "sy",
      totalQty: 10,
      availableQty: 10,
      description: "desc",
      categories: {
        create: {
          categoryName: "test",
        },
      },
    },
    include: {
      categories: true,
    },
  });

  console.log(book);
});
