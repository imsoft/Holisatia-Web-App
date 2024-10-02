"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export const EmptyState = ({
  title = "No hay coincidencias exactas",
  subtitle = "Intente cambiar o eliminar algunos de sus filtros",
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div
      className="
      h-[60vh]
      flex
      flex-col
      gap-2
      justify-center
      items-center
    "
    >
      <div className="text-center">
        <div className="text-2xl font-bold">{title}</div>
        <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
      </div>
      <div className="w-48 mt-4">
        {showReset && (
          <Button variant={"outline"} onClick={() => router.push("/")}>
            Remover todos los filtros
          </Button>
        )}
      </div>
    </div>
  );
};
