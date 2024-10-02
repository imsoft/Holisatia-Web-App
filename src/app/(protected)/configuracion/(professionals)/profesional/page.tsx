"use client";

import {
  AspectInput,
  FocusAreasInput,
  LanguagesInput,
  SpecialtyInput,
  TherapyTypeInput,
} from "@/components/user/professional";
import { useEffect, useState } from "react";
import { getProfessionalInfo } from "@/actions";
import { Professional } from "@prisma/client";
import { useSession } from "next-auth/react";

const ProfessionalSettingsPage = () => {
  const { data: session, status } = useSession();
  const [professionalData, setProfessionalData] = useState<Professional | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionalData = async () => {
      if (session?.user.id) {
        const professional = await getProfessionalInfo(session?.user.id);
        setProfessionalData(professional);
      }
      setIsLoading(false);
    };
    fetchProfessionalData();
  }, [session]);

  if (isLoading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (!session || !professionalData) {
    return (
      <div className="text-center text-red-500">
        Información profesional no encontrada.
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profesional
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Aquí puedes actualizar tu información profesional.
          </p>

          {/* Pasar el ID del profesional y los datos iniciales a los componentes de entrada */}
          {session && (
            <>
              <SpecialtyInput
                initialData={professionalData}
                id={session?.user.id}
              />
              <FocusAreasInput
                initialData={professionalData}
                id={session?.user.id}
              />
              <AspectInput
                initialData={professionalData}
                id={session?.user.id}
              />
              <TherapyTypeInput
                initialData={professionalData}
                id={session?.user.id}
              />
              <LanguagesInput
                initialData={professionalData}
                id={session?.user.id}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfessionalSettingsPage;
