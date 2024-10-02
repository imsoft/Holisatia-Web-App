"use client";

import {
  AddressInput,
  CityInput,
  GoogleMapsUrlInput,
  InnerNumberInput,
  LocationTypeInput,
  NeighborhoodInput,
  OuterNumberInput,
  PostalCodeInput,
  StateInput,
} from "@/components/user/location";
import { useEffect, useState } from "react";
import { Location } from "@prisma/client";
import { getLocationInfo } from "@/actions";
import { useSession } from "next-auth/react";

const LocationSettingsPage = () => {
  const { data: session, status } = useSession();
  const [locationData, setLocationData] = useState<Location | null>(null); // Estado para almacenar los datos de localización
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocationData = async () => {
      if (session?.user.id) {
        const location = await getLocationInfo(session?.user.id); // Obtener la localización
        if (location) {
          setLocationData(location);
        } else {
          // Si no se encuentra la localización, establecer valores por defecto
          setLocationData({
            id: "",
            state: null,
            city: null,
            address: null,
            outerNumber: null,
            innerNumber: null,
            neighborhood: null,
            locationType: null,
            postalCode: null,
            googleMapsUrl: null,
            userLocationId: session?.user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
      setIsLoading(false);
    };

    fetchLocationData();
  }, [session?.user.id]);

  // Mostrar un indicador de carga mientras se obtienen los datos
  if (isLoading) {
    return <div className="text-center">Cargando...</div>;
  }

  // Si no se encuentra la información del usuario
  if (!locationData || !session) {
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
            Ubicación
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Aquí puedes actualizar tu información de ubicación.
          </p>

          <StateInput initialData={locationData} id={userId || ""} />
          <CityInput initialData={locationData} id={userId || ""} />
          <AddressInput initialData={locationData} id={userId || ""} />
          <OuterNumberInput initialData={locationData} id={userId || ""} />
          <InnerNumberInput initialData={locationData} id={userId || ""} />
          <NeighborhoodInput initialData={locationData} id={userId || ""} />
          <LocationTypeInput initialData={locationData} id={userId || ""} />
          <PostalCodeInput initialData={locationData} id={userId || ""} />
          <GoogleMapsUrlInput initialData={locationData} id={userId || ""} />
        </div>
      </div>
    </>
  );
};

export default LocationSettingsPage;
