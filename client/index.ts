import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
//     👆 **type-only** import

// Create the TRPC client, passing AppRouter as the generic type. 
// This ensures type-safety for the client-side code by matching the procedures and their input/output types from the server.
const trpc = createTRPCClient<AppRouter>({
    links: [
        // Set up a batch link for making multiple HTTP requests to the server
        httpBatchLink({
            url: 'http://localhost:3000', // The server URL where the TRPC server is hosted
            async headers() {
                // Add Authorization headers to each request (e.g., for authentication purposes)
                return {
                    Authorization: "Bearer eycadsoii" // Example of a Bearer token
                }
            }
        }),
    ],
});

// Define an asynchronous function to call the `createTodo` mutation
async function main(){
    // Call the `createTodo` mutation on the TRPC client, passing the required input (title and description)
    const response = await trpc.createTodo.mutate({
        title: 'random',  // Example title for the todo
        description: 'random desc.'  // Example description for the todo
    });
    // Log the response from the server (which should include the created todo's id)
    console.log('response', response);
}

// Call the main function to execute the mutation
main();
