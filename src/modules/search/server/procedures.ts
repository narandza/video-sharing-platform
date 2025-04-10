import { z } from "zod";
import { and, desc, eq, ilike, lt, or } from "drizzle-orm";

import { db } from "@/db";
import { videos } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const searchRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        query: z.string(),
        categoryId: z.string().uuid().nullish(),
        cursor: z
          .object({
            id: z.string().uuid(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ input }) => {
      const { cursor, limit, query, categoryId } = input;

      const data = await db
        .select()
        .from(videos)
        .where(
          and(
            ilike(videos.title, `%${query}%`),
            categoryId ? eq(videos.categoryId, categoryId) : undefined,
            cursor
              ? or(
                  lt(videos.updatedAt, cursor.updatedAt),
                  and(
                    eq(videos.updatedAt, cursor.updatedAt),
                    lt(videos.id, cursor.id)
                  )
                )
              : undefined
          )
        )
        .orderBy(desc(videos.updatedAt), desc(videos.id))
        .limit(limit + 1);

      const hasMore = data.length > limit;

      // Remove the last item if there is more data

      const items = hasMore ? data.slice(0, -1) : data;

      // Set the next cursor to the last item if there is more data

      const lastItem = items[items.length - 1];

      const nextCursor = hasMore
        ? {
            id: lastItem.id,
            updatedAt: lastItem.updatedAt,
          }
        : null;

      return {
        items,
        nextCursor,
      };
    }),
});
