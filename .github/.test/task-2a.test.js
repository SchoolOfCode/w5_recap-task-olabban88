import { describe, it, expect } from "@jest/globals";

const dbUrl = "postgres://username:password@hostname:5432/database";
process.env.DATABASE_URL = dbUrl;

const db = await import("../../db/index.js");

describe("./db/index.js", () => {
  it("should have an export named 'pool'", () => {
    expect(db?.pool).toBeDefined();
  });

  it("should instantiate pool with valid 'connectionString'", () => {
    expect(db?.pool?.options?.connectionString).toBe(dbUrl);
  });

  it.todo(
    "should not hard code database credentials/connection details within source code"
  );
});
