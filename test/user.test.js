import supertest from "supertest";
import { app } from "../src/app/app.js";
import { createUser, deleteAllUsers } from "./utils.js";

describe("create user api post /api/users/register", () => {
  afterEach(async () => {
    await deleteAllUsers();
  });

  it("should can register new user", async () => {
    const user = await supertest(app).post("/api/users/register").send({
      username: "test",
      name: "test",
      password: "password",
    });

    expect(user.body.data.username).toBe("test");
    expect(user.body.data.name).toBe("test");
    expect(user.status).toBe(200);
  });
  it("should cant register new user because input not valid", async () => {
    const user = await supertest(app).post("/api/users/register").send({
      username: "te",
      name: "te",
      password: "passwor",
    });

    expect(user.body.errors).toBeDefined();
    expect(user.status).toBe(400);
  });
  it("should cant register new user because input no input", async () => {
    const user = await supertest(app).post("/api/users/register").send({
      username: "",
      name: "t",
      password: "",
    });

    expect(user.body.errors).toBeDefined();
    expect(user.status).toBe(400);
  });
});

describe("login user api POST /api/users/login", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await deleteAllUsers();
  });
  it("should can loggin ", async () => {
    const user = await supertest(app).post("/api/users/login").send({
      username: "test",
      password: "password",
    });

    expect(user.status).toBe(200);
  });
  it("should cant loggin karena password salah", async () => {
    const user = await supertest(app).post("/api/users/login").send({
      username: "test",
      password: "passwordajdinef",
    });

    expect(user.status).toBe(401);
  });
  it("should cant loggin karena user ga ada", async () => {
    const user = await supertest(app).post("/api/users/login").send({
      username: "testasd",
      password: "passwordajdinef",
    });

    expect(user.status).toBe(401);
  });
});
