import z from 'zod';

export const todoSchema = z.object({
  id: z.string().describe('ID of the todo item'),
  title: z.string().describe('Title of the todo item'),
  description: z.string().optional().describe('Description of the todo item'),
  completed: z
    .boolean()
    .default(false)
    .describe('Completion status of the todo item'),
});

export type Todo = z.infer<typeof todoSchema>;
