import { createTRPCRouter } from "../init";

import { studioRouter } from "@/modules/studio/server/procedures";
import { videosRouter } from "@/modules/videos/server/procedures";
import { commentsRouter } from "@/modules/comments/server/procedure";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { videoViewsRouter } from "@/modules/video-views/server/procedures";
import { subscriptionsRouter } from "@/modules/subscriptions/server/procedures";
import { videoReactionsRouter } from "@/modules/video-reactions/server/procedures";

export const appRouter = createTRPCRouter({
  studio: studioRouter,
  categories: categoriesRouter,
  videos: videosRouter,
  comments: commentsRouter,
  videoViews: videoViewsRouter,
  videoReactions: videoReactionsRouter,
  subscriptions: subscriptionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
