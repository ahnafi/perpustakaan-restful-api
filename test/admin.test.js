import supertest from "supertest";
import { app } from "../src/app/app.js";
import { createAdmin, createUser, deleteAllUsers } from "./utils.js";
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

describe("login admin api POST /api/admin/login", () => {
  beforeEach(async () => {
    await createAdmin();
  });
  afterEach(async () => {
    await deleteAllUsers();
  });
  it("should can loggin ", async () => {
    const user = await supertest(app).post("/api/admin/login").send({
      username: "test",
      password: "password",
    });
    expect(user.status).toBe(200);
    expect(user.body.data.token).toBeDefined();
  });
  it("should cant loggin karena password salah", async () => {
    const user = await supertest(app).post("/api/admin/login").send({
      username: "test",
      password: "passwordajdinef",
    });

    expect(user.status).toBe(401);
  });
  it("should cant loggin karena admin ga ada", async () => {
    const user = await supertest(app).post("/api/admin/login").send({
      username: "testasd",
      password: "passwordajdinef",
    });

    expect(user.status).toBe(401);
  });
});

describe("login admin api POST /api/admin/login", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await deleteAllUsers();
  });
  it("should cant loggin karena user bukan admin", async () => {
    const user = await supertest(app).post("/api/admin/login").send({
      username: "test",
      password: "password",
    });

    expect(user.status).toBe(401);
  });
});
