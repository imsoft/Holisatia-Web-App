"use client";

import { useEffect, useState } from "react";
import {
  ClosingHoursInput,
  ConsultationFormatInput,
  ConsultoryImageInput,
  OpeningHoursInput,
  PriceInput,
  SessionDurationInput,
} from "@/components/user/medical-session";
import { useCurrentUser } from "@/hooks";
import { ProfessionalSessionDetail } from "@prisma/client"; // Importar el tipo correcto
import { getMedicalSessionInfo } from "@/actions";

const MedicalSessionSettingsPage = () => {
  const user = useCurrentUser();
  const [medicalSessionData, setMedicalSessionData] =
    useState<ProfessionalSessionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMedicalSessionData = async () => {
      if (user?.id) {
        const sessionData = await getMedicalSessionInfo(user.id);
        setMedicalSessionData(sessionData);
      }
      setIsLoading(false);
    };

    fetchMedicalSessionData();
  }, [user]);

  if (isLoading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (!user || !medicalSessionData) {
    return (
      <div className="text-center text-red-500">
        Información no encontrada. Por favor, completa primero la información de
        la pestaña Profesional.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Sesión médica
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Aquí puedes actualizar tu información de la sesión médica.
        </p>

        <PriceInput
          initialData={medicalSessionData}
          id={medicalSessionData.id}
        />
        <SessionDurationInput
          initialData={medicalSessionData}
          id={medicalSessionData.id}
        />
        <OpeningHoursInput
          initialData={medicalSessionData}
          id={medicalSessionData.id}
        />
        <ClosingHoursInput
          initialData={medicalSessionData}
          id={medicalSessionData.id}
        />
        <ConsultationFormatInput
          initialData={medicalSessionData}
          id={medicalSessionData.id}
        />
        <ConsultoryImageInput
          initialData={medicalSessionData}
          id={medicalSessionData.id}
        />
      </div>
    </div>
  );
};

export default MedicalSessionSettingsPage;
