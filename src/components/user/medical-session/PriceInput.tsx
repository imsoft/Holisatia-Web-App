"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfessionalSessionDetail } from "@prisma/client";
import { FiEdit } from "react-icons/fi";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useToast } from "@/hooks";

interface PriceInputProps {
  id: string;
  initialData: ProfessionalSessionDetail;
}

const formSchema = z.object({
  price: z
    .number()
    .min(1, {
      message: "El Precio es requerido y debe ser mayor a 1",
    })
    .refine((value) => !isNaN(value), {
      message: "Debe ser un número válido",
    }),
});

export const PriceInput = ({ id, initialData }: PriceInputProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isEditing, setisEditing] = useState(false);

  const toggleEdit = () => {
    setisEditing((prev) => !prev);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { price: initialData?.price ?? 0 }, // Cambiar a null para que el campo esté vacío por defecto
    mode: "onChange", // Para que valide en cada cambio de input
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Convertir el valor de 'price' a un número
      const parsedValues = {
        ...values,
        price: Number(values.price),
      };

      // Asegúrate de que este 'id' es el correcto del ProfessionalSessionDetail
      await axios.patch(`/api/user/medical-session/${id}`, parsedValues);

      toast({
        variant: "success",
        title: "¡Información Actualizada! 🎉",
        description: "Información actualizada exitosamente.",
      });
      toggleEdit();
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Algo salió mal.",
        description: "Por favor intenta de nuevo.",
      });
    }
  };

  return (
    <>
      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
        <div className="pt-6 sm:flex">
          <dt className="font-medium flex items-center text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Precio
          </dt>
          <dd className="mt-1 flex justify-between items-center gap-x-6 sm:mt-0 sm:flex-auto">
            {isEditing ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex items-center w-full"
                >
                  <div className="relative mt-2 rounded-md shadow-sm w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="bg-white w-full">
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber)
                              } // Convertir directamente a número
                              disabled={isSubmitting}
                              className="w-full border-gray-300 pl-6 rounded-md shadow-sm sm:text-sm focus:ring-primary focus:border-primary"
                              autoFocus
                              placeholder="Ingresa un precio"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-9">
                      <span
                        id="price-currency"
                        className="text-gray-500 sm:text-sm"
                      >
                        MXN
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      variant={"accept"}
                    >
                      Aceptar
                    </Button>
                    <Button
                      type="button"
                      variant={"outline"}
                      onClick={toggleEdit}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="text-gray-900">
                {formatCurrency(initialData?.price ?? 0)}
              </div>
            )}

            {!isEditing && (
              <Button className="gap-2" type="button" onClick={toggleEdit}>
                <FiEdit />
                Editar
              </Button>
            )}
          </dd>
        </div>
      </dl>
    </>
  );
};
