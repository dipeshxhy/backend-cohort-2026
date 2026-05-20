import z from 'zod';

const userSignupSchema = z.object({
  firstName: z
    .string()
    .describe("The user's first name")
    .min(3, 'First name must be at least 3 characters long')
    .max(45, 'First name must be at most 45 characters long'),
  lastName: z.string().describe("The user's last name").optional(),
  email: z.email().describe("The user's email address"),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .describe("The user's password, must be at least 8 characters long"),
});

const userSignInSchema = z.object({
  email: z.email().describe("The user's email address"),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .describe("The user's password, must be at least 8 characters long")
    .optional(),
});

type UserSignUpPayloadInput = z.infer<typeof userSignupSchema>;

type UserSignInPayloadInput = z.infer<typeof userSignInSchema>;

// !schema
export { userSignInSchema, userSignupSchema };

// !types
export type { UserSignInPayloadInput, UserSignUpPayloadInput };
