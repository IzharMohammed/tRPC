import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

// Define the input schema for creating a todo, using zod for validation
const todoInputType = z.object({
    title: z.string(),
    description: z.string(),
})

// Define the input schema for signing up, using zod for validation
const signUpInputType = z.object({
    email: z.string(),
    password: z.string(),
})

// Define the application's router with two procedures: signUp and createTodo
const appRouter = router({
    // The signUp procedure takes an input of email and password
    signUp: publicProcedure
        .input(signUpInputType) // Use the defined zod schema to validate the input
        .mutation(async (opts) => {
            // Extract email and password from the input
            let email = opts.input.email;
            let password = opts.input.password;

            // Perform validations, e.g., checking email format or password strength
            // Handle database operations like saving the user data here

            // Return a token as a response (dummy token in this case)
            let token = "123123";
            return {
                token
            }
        }),

    // The createTodo procedure takes a title and description for creating a todo
    createTodo: publicProcedure
        .input(todoInputType) // Validate the input using the zod schema
        .mutation(async (opts) => {
            // Extract title and description from the input
            const title = opts.input.title;
            const description = opts.input.description;

            // Log success message and username from the context
            console.log(`Entered successfully`);
            console.log('username', opts.ctx.username);

            // Perform database operations like saving the todo here

            // Return the id of the created todo (dummy id in this case)
            return {
                id: "1",
            }
        })
});

// Create the HTTP server, passing the appRouter and the context creation logic
const server = createHTTPServer({
    router: appRouter,
    // The context is created for each request, useful for passing things like authentication info
    createContext(opts) {
        // Extract the authorization header from the request
        let authHeader = opts.req.headers['authorization'];
        console.log('authHeader', authHeader);

        // Return a context object, here with a static username (for demonstration purposes)
        return {
            username: 'izhar'
        }
    }
});

// Start the server and listen on port 3000
server.listen(3000);

// Export the type of the appRouter to be used elsewhere in the app
export type AppRouter = typeof appRouter;
