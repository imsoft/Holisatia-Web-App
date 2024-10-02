// import { useSession } from "next-auth/react";

// export const useCurrentUser = () => {
//   const session = useSession();

//   if (!session.data) {
//     return null;
//   }

//   return session.data?.user;
// };

import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session, status } = useSession();

  // Solo si la sesión está autenticada, devuelve el usuario
  if (status === "authenticated" && session?.user) {
    return session.user;
  }

  // Si no hay sesión o está en estado de carga, devuelve null
  return null;
};
