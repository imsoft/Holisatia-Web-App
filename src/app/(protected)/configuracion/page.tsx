"use client";

import { getUserInfo } from "@/actions";
import {
  BirthdayInput,
  ImageInput,
  NameInput,
} from "@/components/user/personal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfessionalInfoPage = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user.id) {
        const data = await getUserInfo(session?.user.id);
        setUserData(data);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [session?.user.id]);

  // Mientras se cargan los datos, mostramos un mensaje de carga
  if (isLoading) {
    return <div className="text-center">Cargando...</div>;
  }

  // Si no se encuentra información del usuario
  if (!userData) {
    return (
      <div className="text-center text-red-500">
        Información del usuario incompleta o no encontrada.
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Aquí puedes actualizar tu información personal
          </p>
          <NameInput initialData={userData} id={session?.user.id ?? ""} />
          <BirthdayInput initialData={userData} id={session?.user.id ?? ""} />
          <ImageInput initialData={userData} id={session?.user.id ?? ""} />
        </div>
      </div>
    </>
  );
};

export default ProfessionalInfoPage;
