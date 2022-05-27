import { it, expect, jest, beforeAll } from "@jest/globals";
import { parse } from "pgsql-ast-parser";

const { pool } = await import("../../db/index.js");
const querySpy = jest.spyOn(pool, "query").mockImplementation(async () => ({}));

describe("./scripts/createTable.js", () => {
  /** @type {string} */
  let rawSqlQuery;

  /** @type {ReturnType<typeof parse>} */
  let parsedAst;

  /** @type {(typeof parsedAst)[number] | undefined} */
  let firstAstNode;

  beforeAll(async () => {
    querySpy.mockClear();
    // Side effect
    await import("../../db/scripts/createTable.js").catch(() => {});

    rawSqlQuery = querySpy.mock?.calls?.[0]?.[0];
  });

  it("should use a syntactically valid SQL query", () => {
    // Might be better to have postgres instance running in Docker container.
    // That way, pool.query doesn't need to be mocked but db interactions also don't have go over public internet (which would make tests slow and flaky).

    expect(() => {
      parsedAst = parse(rawSqlQuery);
      firstAstNode = parsedAst[0];
    }).not.toThrow();
  });

  it("should contain only one statement", () => {
    expect(parsedAst?.length).toBe(1);
  });

  it("should create a table", () => {
    expect(firstAstNode?.type).toBe("create table");
  });

  it("should name the created table 'cats'", () => {
    expect(firstAstNode?.name?.name).toBe("cats");
  });

  it("should define four columns when creating the table", () => {
    expect(firstAstNode?.columns?.length).toBe(4);
  });

  describe("table columns", () => {
    let id, cat, human, hobby;

    beforeAll(() => {
      [id, cat, human, hobby] = ["id", "cat", "human", "hobby"].map(
        (columnName) => {
          return firstAstNode?.columns?.find(
            (col) => "column" === col.kind && columnName === col?.name?.name
          );
        }
      );
    });

    describe("id column", () => {
      it("should be defined in the cats table", () => {
        expect(id).toBeTruthy();
      });

      it("should be the primary key", () => {
        expect(id?.constraints).toContainEqual({ type: "primary key" });
      });

      it("should be of type integer", () => {
        expect(id?.dataType?.name).toMatch(/^int(?:eger)?$/);
      });

      it("should be an identity column", () => {
        expect(id?.constraints).toContainEqual({
          type: "add generated",
          always: "always",
        });
      });
    });

    describe("cat column", () => {
      it("should be defined in the cats table", () => {
        expect(cat).toBeTruthy();
      });

      it("should be of type varchar(50)", () => {
        expect(cat?.dataType?.name).toBe("varchar");
        expect(cat?.dataType?.config).toContainEqual(50);
      });

      it("should have a non-null constraint", () => {
        expect(cat?.constraints).toContainEqual({ type: "not null" });
      });
    });

    describe("human column", () => {
      it("should be defined in the cats table", () => {
        expect(human).toBeTruthy();
      });

      it("should be of type varchar(50)", () => {
        expect(human?.dataType?.name).toBe("varchar");
        expect(human?.dataType?.config).toContainEqual(50);
      });

      it("should have a non-null constraint", () => {
        expect(human?.constraints).toContainEqual({ type: "not null" });
      });
    });

    describe("hobby column", () => {
      it("should be defined in the cats table", () => {
        expect(hobby).toBeTruthy();
      });

      it("should be of type varchar(50)", () => {
        expect(hobby?.dataType?.name).toBe("varchar");
        expect(hobby?.dataType?.config).toContainEqual(50);
      });

      it("should have a non-null constraint", () => {
        expect(hobby?.constraints).toContainEqual({ type: "not null" });
      });
    });
  });

  it.todo("should import 'pool' instance");
  it.todo("should call and await 'pool.query'");
  it.todo("should shut down the pool at the end of the script");
});

describe("./scripts/populateTable.js", () => {
  /** @type {string} */
  let rawSqlQuery;

  /** @type {ReturnType<typeof parse>} */
  let parsedAst;

  /** @type {import('pgsql-ast-parser').Statement | undefined}*/
  let firstAstNode;

  beforeAll(async () => {
    querySpy.mockClear();
    // Side effect
    await import("../../db/scripts/populateTable.js");

    rawSqlQuery = querySpy.mock?.calls?.[0]?.[0];
  });

  it("should use a syntactically valid SQL query", () => {
    // Might be better to have postgres instance running in Docker container.
    // That way, pool.query doesn't need to be mocked but db interactions also don't have go over public internet (which would make tests slow and flakey).

    expect(() => {
      parsedAst = parse(rawSqlQuery);
      firstAstNode = parsedAst[0];
    }).not.toThrow();
  });

  it("should insert values into a table", () => {
    expect(firstAstNode?.type).toBe("insert");
  });

  it("should target the 'cats' table", () => {
    expect(firstAstNode?.into?.name).toBe("cats");
  });

  it("should list columns correctly if specified", () => {
    if (firstAstNode?.columns) {
      expect(firstAstNode?.columns).toContainEqual({ name: "cat" });
      expect(firstAstNode?.columns).toContainEqual({ name: "human" });
      expect(firstAstNode?.columns).toContainEqual({ name: "hobby" });
    }
  });

  it("should use a parameterised query with placeholders", () => {
    expect(firstAstNode?.insert?.type).toBe("values");
    expect(firstAstNode?.insert?.values?.length).toBeGreaterThan(0);
    firstAstNode?.insert?.values
      ?.flat()
      .flatMap((node) => node.expressions ?? node)
      .forEach((node) => {
        expect(node.type).toBe("parameter");
      });
  });

  it.todo("should import 'pool' instance");
  it.todo("should call and await 'pool.query'");
  it.todo("should shut down the pool at the end of the script");
});
