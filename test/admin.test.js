import supertest from "supertest";
import { app } from "../src/app/app.js";
import { createAdmin, deleteAllUsers } from "./utils.js";
import { logger } from "../src/app/logging.js";

describe("create admin api post /api/admin/register", () => {
  afterEach(async () => {
    await deleteAllUsers();
  });

  it("should can register new admin", async () => {
    const admin = await supertest(app).post("/api/admin/register").send({
      username: "test",
      name: "test",
      password: "password",
    });
    logger.info(admin.body);

    expect(admin.body.data.username).toBe("test");
    expect(admin.body.data.role).toBe("ADMIN");
    expect(admin.status).toBe(200);
  });
  it("should cant register new admin because input not valid", async () => {
    const admin = await supertest(app).post("/api/admin/register").send({
      username: "te",
      name: "te",
      password: "passwor",
    });

    expect(admin.body.errors).toBeDefined();
    expect(admin.status).toBe(400);
  });
  it("should cant register new admin because input no input", async () => {
    const admin = await supertest(app).post("/api/admin/register").send({
      username: "",
      name: "t",
      password: "",
    });

    expect(admin.body.errors).toBeDefined();
    expect(admin.status).toBe(400);
  });
});
