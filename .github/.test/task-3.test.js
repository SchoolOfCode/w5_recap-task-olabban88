import { it, expect, jest, describe, beforeAll } from "@jest/globals";
import { parse } from "pgsql-ast-parser";
import supertest from "supertest";
import * as catsData from "./cats-data.js";

const { pool } = await import("../../db/index.js");
const { default: app } = await import("../../app.js");
const request = supertest(app);

const querySpy = jest.spyOn(pool, "query").mockImplementation(async () => ({}));

const catsModel = await import("../../models/cats.js").catch(() => ({}));

describe("catsModel", () => {
  it("should be available at ./models/cats.js", () => {
    expect(catsModel).not.toStrictEqual({});
  });
});

describe("catsModel.getAllCats", () => {
  /** @type {ReturnType<typeof parse>} */
  let parsedAst;

  /** @type {import('pgsql-ast-parser').Statement | undefined}*/
  let firstAstNode;

  it("should be a function", () => {
    expect(catsModel.getAllCats).toStrictEqual(expect.any(Function));
  });

  it("should not take in any parameters", () => {
    expect(catsModel.getAllCats).toHaveLength(0);
  });

  it("should call 'pool.query' with a valid sql query", async () => {
    querySpy.mockResolvedValue({
      rows: catsData.allCats,
    });

    await catsModel.getAllCats();
    const rawSqlQuery = querySpy.mock.lastCall?.[0];
    expect(() => {
      parsedAst = parse(rawSqlQuery);
      firstAstNode = parsedAst[0];
    }).not.toThrow();
  });

  it("should perform a select operation", () => {
    expect(firstAstNode?.type).toBe("select");
  });

  it("should read from the 'cats' table", () => {
    expect(firstAstNode?.from?.[0]?.name?.name).toBe("cats");
  });

  it("should return all cats", async () => {
    await expect(catsModel.getAllCats()).resolves.toStrictEqual(
      catsData.allCats
    );
  });
});

describe("catsModel.getCatsByName", () => {
  it.todo("should be a function");
  it.todo("should take in a single parameter");
  it.todo("should call 'pool.query' with a valid sql query");
  it.todo("should perform a select operation");
  it.todo("should read from the 'cats' table");
  it.todo("should have a WHERE clause");
  it.todo(
    "should use a parameter in the WHERE clause to reduce risk of sql injection"
  );
  it.todo("should return cats with matching names");
});

describe("catsModel.getCatById", () => {
  /** @type {ReturnType<typeof parse>} */
  let parsedAst;

  /** @type {(typeof parsedAst)[number] | undefined}*/
  let firstAstNode;

  it("should be a function", () => {
    expect(catsModel.getCatById).toStrictEqual(expect.any(Function));
  });

  it("should take in one parameter", () => {
    expect(catsModel.getCatById).toHaveLength(1);
  });

  it("should call 'pool.query' with a valid sql query", async () => {
    querySpy.mockResolvedValue({
      rows: [catsData.firstCat],
    });
    // Side effect
    await catsModel.getCatById(catsData.firstCat.id);
    const rawSqlQuery = querySpy.mock.lastCall?.[0];

    expect(() => {
      parsedAst = parse(rawSqlQuery);
      firstAstNode = parsedAst[0];
    }).not.toThrow();
  });

  it("should perform a select operation", () => {
    expect(firstAstNode?.type).toBe("select");
  });

  it("should read from the 'cats' table", () => {
    expect(firstAstNode?.from?.[0]?.name?.name).toBe("cats");
  });

  it("should include a WHERE clause", () => {
    expect(firstAstNode?.where).toBeDefined();
  });

  it("should use a parameter in the WHERE clause to reduce risk of sql injection", () => {
    expect([
      firstAstNode?.where?.left,
      firstAstNode?.where?.right,
    ]).toContainEqual(
      expect.objectContaining({
        type: "parameter",
      })
    );
  });

  it("should provide a value for parameter in query", () => {
    const parameterValues = querySpy.mock.lastCall?.[1];
    expect(parameterValues).toStrictEqual([catsData.firstCat.id]);
  });

  it("should return a cat object (and not an array containing a single cat object)", async () => {
    const catId = catsData.firstCat.id;
    await expect(catsModel.getCatById(catId)).resolves.toStrictEqual(
      catsData.firstCat
    );
  });
});

describe("catsModel.createCat", () => {
  /** @type {ReturnType<typeof parse>} */
  let parsedAst;

  /** @type {import('pgsql-ast-parser').Statement | undefined}*/
  let firstAstNode;

  it("should be a function", () => {
    expect(catsModel.createCat).toStrictEqual(expect.any(Function));
  });

  it("should take in one parameter", () => {
    expect(catsModel.createCat).toHaveLength(1);
  });

  it("should call 'pool.query' with a valid sql query", async () => {
    querySpy.mockResolvedValue({
      rows: [catsData.firstCat],
    });
    // Side effect
    await catsModel.createCat(catsData.firstCat);
    const rawSqlQuery = querySpy.mock.lastCall?.[0];

    expect(() => {
      parsedAst = parse(rawSqlQuery);
      firstAstNode = parsedAst[0];
    }).not.toThrow();
  });

  it("should perform an insert operation", () => {
    expect(firstAstNode?.type).toBe("insert");
  });

  it("should insert into the 'cats' table", () => {
    expect(firstAstNode?.into?.name).toBe("cats");
  });

  it("should target the columns: cat, human, hobby", () => {
    expect(firstAstNode?.columns).toContainEqual({ name: "cat" });
    expect(firstAstNode?.columns).toContainEqual({ name: "human" });
    expect(firstAstNode?.columns).toContainEqual({ name: "hobby" });
  });

  it("should use a parameterised query to reduce risk of sql injection", () => {
    expect(firstAstNode?.insert?.values?.flat?.()).toContainEqual(
      expect.objectContaining({
        type: "parameter",
      })
    );
  });

  it("should provide values for parameters in query", () => {
    const parameterValues = querySpy.mock.lastCall?.[1];
    const { cat, human, hobby } = catsData.firstCat;
    expect(parameterValues).toStrictEqual([cat, human, hobby]);
  });

  it("should return a cat object (and not an array containing a single cat object)", async () => {
    const catId = catsData.firstCat.id;
    await expect(catsModel.createCat(catId)).resolves.toStrictEqual(
      catsData.firstCat
    );
  });
});

describe("GET /api/cats", () => {
  let response;

  beforeAll(async () => {
    querySpy.mockResolvedValue({
      rows: catsData.allCats,
    });

    response = await request.get("/api/cats");
  });

  it("should respond with http status 200", () => {
    expect(response.statusCode).toBe(200);
  });

  it("should indicate a json response body via content-type response header", () => {
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  it("should respond with a correctly shaped body", () => {
    expect(response.body).toStrictEqual({
      success: true,
      payload: catsData.allCats,
    });
  });

  it.todo("should call 'catsModel.getAllCats'");
});

describe("GET /api/cats/:id", () => {
  let response;

  beforeAll(async () => {
    querySpy.mockResolvedValue({
      rows: [catsData.firstCat],
    });

    response = await request.get(`/api/cats/${catsData.firstCat.id}`);
  });

  it("should respond with http status 200", () => {
    expect(response.statusCode).toBe(200);
  });

  it("should indicate a json response body via content-type response header", () => {
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  it("should respond with a correctly shaped body", () => {
    expect(response.body).toStrictEqual({
      success: true,
      payload: catsData.firstCat,
    });
  });

  it.todo("should call 'catsModel.getCatById' with requested id");
});

describe("POST /api/cats", () => {
  let response;

  const creationInput = {
    cat: "Abe",
    human: "Barbara",
    hobby: "Chewing gum",
  };

  const created = { ...creationInput, id: 9999 };

  beforeAll(async () => {
    querySpy.mockResolvedValue({
      rows: [created],
    });

    response = await request.post("/api/cats").send(creationInput);
  });

  it("should respond with http status 201", () => {
    expect(response.statusCode).toBe(201);
  });

  it("should indicate a json response body via content-type response header", () => {
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  it("should respond with a correctly shaped body", () => {
    expect(response.body).toStrictEqual({
      success: true,
      payload: created,
    });
  });

  it.todo("should call 'catsModel.createCat'");
});
