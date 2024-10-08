"use client";

import { useEffect, useState } from "react";
import {
  FacebookInput,
  InstagramInput,
  LinkedInInput,
  PhoneNumberInput,
  ThreadsInput,
  TiktokInput,
  XInput,
} from "@/components/user/contact";
import { getContactInfo } from "@/actions";
import { Contact } from "@prisma/client";
import { useSession } from "next-auth/react";

const ContactSettingsPage = () => {
  const { data: session, status } = useSession();
  const [contactData, setContactData] = useState<Contact | null>(null); // Estado para almacenar los datos de contacto
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      if (session?.user.id) {
        const contact = await getContactInfo(session?.user.id); // Obtener la información de contacto
        if (contact) {
          setContactData(contact);
        } else {
          // Si no hay datos, establecer un objeto por defecto
          setContactData({
            id: "",
            facebookUrl: null,
            instagramUrl: null,
            tiktokUrl: null,
            threadsUrl: null,
            youtubeUrl: null,
            xUrl: null,
            linkedinUrl: null,
            phoneNumber: null,
            userContactId: session?.user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
      setIsLoading(false);
    };

    fetchContactData();
  }, [session?.user.id]);

  // Mostrar un indicador de carga mientras se obtienen los datos
  if (isLoading) {
    return <div className="text-center">Cargando...</div>;
  }

  // Si no se encuentra la información del usuario
  if (!contactData || !session) {
    return (
      <div className="text-center text-red-500">
        Información del usuario incompleta o no encontrada.
      </div>
    );
  }

  const userId = session?.user.id;

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Contacto
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Aquí puedes actualizar tu información de contacto.
          </p>
          <FacebookInput initialData={contactData} id={userId} />
          <InstagramInput initialData={contactData} id={userId} />
          <TiktokInput initialData={contactData} id={userId} />
          <ThreadsInput initialData={contactData} id={userId} />
          <XInput initialData={contactData} id={userId} />
          <LinkedInInput initialData={contactData} id={userId} />
          <PhoneNumberInput initialData={contactData} id={userId} />
        </div>
      </div>
    </>
  );
};

export default ContactSettingsPage;
