import { z } from "zod";

import { db } from "@/db";
import { videos } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, desc, eq, lt, or } from "drizzle-orm";

export const studioRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string().uuid(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const { id: userId } = ctx.user;

      const data = await db.select().from(videos);

      return data;
    }),
});
