import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const todoInputType = z.object({
    title: z.string(),
    description: z.string(),
})

const signUpInputType = z.object({
    email: z.string(),
    password: z.string(),
})

const appRouter = router({
    signUp: publicProcedure
        .input(signUpInputType)
        .mutation(async (opts) => {
            let email = opts.input.email;
            let password = opts.input.password;

            // Do validations here
            // Do database stuff here 

            let token = "123123";
            return {
                token
            }

        }),

    createTodo: publicProcedure
        .input(todoInputType)
        .mutation(async (opts) => {
            const title = opts.input.title;
            const description = opts.input.description;
            console.log(`Entered successfully`);
            console.log('username', opts.ctx.username);

            // Do db stuff
            return {
                id: "1",
            }
        })
});

const server = createHTTPServer({
    router: appRouter,
    createContext(opts) {
        let authHeader = opts.req.headers['authorization'];
        console.log('authHeader', authHeader);

        return {
            username: 'izhar'
        }
    }
});

server.listen(3000);

export type AppRouter = typeof appRouter;