"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from ".";

interface IUseFavorites {
  professionalId: string;
  currentUser?: { id: string; favoriteIds: string[] } | null;
}

const useFavorite = ({ professionalId, currentUser }: IUseFavorites) => {
  const { toast } = useToast();
  const router = useRouter();

  // Aquí quitamos el `useMemo`, simplemente verificamos si está en favoritos
  const hasFavorited =
    currentUser?.favoriteIds?.includes(professionalId) || false;

  // Aquí quitamos el `useCallback`, solo manejamos la lógica sin memoización
  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Debes iniciar sesión.",
        description: "Por favor inicia sesión para continuar.",
      });
      return;
    }

    try {
      let request;
      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${professionalId}`);
      } else {
        request = () => axios.post(`/api/favorites/${professionalId}`);
      }

      await request();
      router.refresh();
      toast({
        variant: "success",
        title: "¡Información Actualizada! 🎉",
        description: "Información actualizada exitosamente.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Algo salió mal.",
        description: "Por favor intenta de nuevo.",
      });
    }
  };

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
