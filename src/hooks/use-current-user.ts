import { auth } from "../../auth";

export const useCurrentUser = async() => {
  const session = await auth();

  if (!session || !session.user) return null;

  // Si no hay sesión o está en estado de carga, devuelve null
  return session.user;
};
