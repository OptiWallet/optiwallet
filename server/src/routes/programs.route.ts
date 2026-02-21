import Elysia from "elysia";
import { db } from "../repositories/db";

export const programsRoutes = new Elysia({ prefix: "/programs" })
  .get("/", async () => {
    const programs = await db.query.programs.findMany();
    return programs;
  });
