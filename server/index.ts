import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const todoInputType = z.object({
    title: z.string(),
    description: z.string(),
})

const appRouter = router({
    createTodo: publicProcedure
        .input(todoInputType)
        .mutation(async (opts) => {
            const title = opts.input.title;
            const description = opts.input.description;
console.log(`Entered successfully`);

            // Do db stuff
            return {
                id: "1",
            }

        })

});

const server = createHTTPServer({
    router: appRouter,
});

server.listen(3000);

export type AppRouter = typeof appRouter;