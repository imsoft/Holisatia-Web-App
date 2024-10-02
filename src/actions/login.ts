"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../auth"
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales incorrectas" };

        default:
          return { error: "Algo salio mal" };
      }
    }
    throw error;
  }
};
