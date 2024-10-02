"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "@/hooks/useFavorite";

interface HeartButtonProps {
  professionalId: string;
  currentUser?: { id: string; favoriteIds: string[] } | null;
}

export const HeartButton = ({
  professionalId,
  currentUser,
}: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    professionalId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite} // Se llamará directamente, sin memoización
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};
