import crypto from 'crypto';

import type { Request, Response } from 'express';
import { UserSignInPayloadInput, UserSignUpPayloadInput } from './schema.js';
import { db } from '../../db/index.js';
import { usersTable } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import { APIError } from '../../utils/api-error.js';
import { APIResponse } from '../../utils/api-response.js';
import { createHash, generateSalt, SignJWT } from '../../utils/jwt-token.js';
import { AuthenticatedRequest } from './auth.middleware.js';

export class AuthController {
  public async handleSignUp(req: Request, res: Response) {
    const { firstName, lastName, email, password } =
      req.body as UserSignUpPayloadInput;

    // check user exists in db
    const [userExists] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (userExists) {
      throw APIError.conflict(`User with this email: ${email} already exists`);
    }

    const salt = generateSalt();
    const hash = createHash(password, salt);

    // Create new user
    const [user] = await db
      .insert(usersTable)
      .values({
        firstName,
        lastName,
        email,
        password: hash,
        salt,
      })
      .returning({ id: usersTable.id });
    return APIResponse.created(
      res,
      { id: user?.id },
      'User created successfully',
    );
  }

  public async handleSignIn(req: Request, res: Response) {
    // Placeholder for sign-in logic
    const { email, password } = req.body as UserSignInPayloadInput;
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!user) {
      throw APIError.unauthorized('Invalid email or password');
    }

    const salt = user.salt;
    const hash = createHash(password!, salt!);

    if (hash !== user.password) {
      throw APIError.unauthorized('Invalid email or password');
    }

    // !token and return
    const token = SignJWT({ userId: user.id });
    return APIResponse.ok(
      res,
      { id: user.id, token },
      'User signed in successfully',
    );
  }

  public async getMe(req: AuthenticatedRequest, res: Response) {
    const id = req.user!.userId;
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    const userObj = {
      id: user!.id,
      firstName: user!.firstName,
      lastName: user!.lastName,
      email: user!.email,
    };
    return APIResponse.ok(res, userObj, 'User Profile retrieved successfully');
  }
}
