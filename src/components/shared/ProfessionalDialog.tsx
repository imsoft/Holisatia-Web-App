"use client";

import { useProfessionalDialog, useToast } from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";

interface ProfessionalDialogProps {
  currentUser: { id: string } | null; // Permitir que sea null
}

export const ProfessionalDialog = ({
  currentUser,
}: ProfessionalDialogProps) => {
  const { toast } = useToast();
  const { isOpen, onClose } = useProfessionalDialog();
  const [isLoading, setIsLoading] = useState(false);

  // Manejar el caso en que currentUser sea null
  if (!currentUser) {
    return null; // O mostrar un mensaje de error o hacer otra cosa
  }

  // Función para manejar el cambio de rol del usuario a "professional"
  const onSubmit = async () => {
    setIsLoading(true);

    try {
      if (!currentUser) {
        toast({
          variant: "destructive",
          title: "Uh oh! Algo salio mal.",
          description: "Hubo un problema al registrarte.",
        });
        setIsLoading(false);
        return;
      }

      // Realiza la solicitud para cambiar el rol del usuario
      await axios.patch(`/api/user/${currentUser.id}`, {
        role: "professional",
      });

       // Crear un nuevo profesional vinculado al usuario
       await axios.post(`/api/professional`, {
        userId: currentUser.id,
      });

      toast({
        variant: "success",
        title: "¡Felicidades! 🎉",
        description: "Tu cuenta ha sido actualizada a profesional.",
      });
      onClose(); // Cierra el diálogo después de actualizar
    } catch (error) {
      console.error("Error en la solicitud:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Algo salio mal.",
        description: "Hubo un problema al registrarte.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>¿Eres un profesional?</DialogTitle>
            <DialogDescription>
              Sé parte de nuestra increíble comunidad
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={onSubmit}
              disabled={isLoading} // Desactiva el botón si está cargando
            >
              {isLoading ? "Cargando..." : "¡Quiero volverme profesional!"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
