import Image from "next/image";
import { Avatar, HeartButton } from "@/components/shared";
import { getProfessional } from "@/actions";
import { Container } from "@/components/shared";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const ProfessionalIdPage = async ({
  params,
}: {
  params: { professionalId: string };
}) => {
  const professional = await getProfessional(params.professionalId);

  if (!professional) {
    return <div>No se encontró el profesional.</div>;
  }

  return (
    <>
      <Container>
        <div className="max-w-screen-lg mx-auto flex flex-col gap-10 py-10">
          {/* Encabezado: Imagen y detalles principales */}
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold text-gray-900">
              {professional.userProfessional?.name}
            </div>
            <div className="font-light text-neutral-500">
              {professional.userProfessional?.email}
            </div>

            <div className="w-full h-auto overflow-hidden rounded-xl relative">
              {professional.sessionDetails?.consultoryImages?.length ? (
                <Carousel className="w-full h-full">
                  <CarouselContent className="w-[101.4%] h-full gap-2">
                    {professional.sessionDetails.consultoryImages.map(
                      (imageUrl, index) => (
                        <CarouselItem
                          key={index}
                          className="w-full h-full relative"
                        >
                          <Card className="p-6 w-full h-full">
                            <CardContent className="flex aspect-auto items-center justify-center w-full h-full p-0">
                              <Image
                                alt={`Imagen del consultorio ${index + 1}`}
                                src={imageUrl}
                                width={1200}
                                height={800}
                                className="object-cover w-full h-full aspect-video"
                              />
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      )
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md" />
                  <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md" />
                </Carousel>
              ) : (
                <div className="text-center text-gray-500">
                  No hay imágenes del consultorio disponibles.
                </div>
              )}
              <div className="absolute top-5 right-5">
                <HeartButton professionalId={professional.id} />
              </div>
            </div>
          </div>

          {/* Información general del profesional */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2 flex flex-col gap-6">
              <div className="text-xl font-semibold flex flex-row items-center gap-2">
                <div>{professional.userProfessional?.name}</div>
                <Avatar src={professional.userProfessional?.image} />
              </div>

              <div className="flex flex-row gap-6 text-neutral-700 font-light">
                <div>
                  Especialidad: <strong>{professional.specialty}</strong>
                </div>
                <div>
                  Idiomas: <strong>{professional.languages}</strong>
                </div>
              </div>

              <div className="text-lg font-light text-neutral-500">
                Aspecto: {professional.aspect}
              </div>

              {professional.focusAreas && (
                <div className="text-lg font-semibold">
                  Áreas de enfoque:
                  <div className="text-neutral-500 font-light">
                    {professional.focusAreas}
                  </div>
                </div>
              )}

              <hr />

              <div className="text-lg font-light text-neutral-500">
                Dirección:{" "}
                <div className="text-neutral-700">
                  {professional.userProfessional?.locations?.address},{" "}
                  {professional.userProfessional?.locations?.outerNumber},{" "}
                  {professional.userProfessional?.locations?.innerNumber},{" "}
                  {professional.userProfessional?.locations?.neighborhood},{" "}
                  {professional.userProfessional?.locations?.city},{" "}
                  {professional.userProfessional?.locations?.state},{" "}
                  {professional.userProfessional?.locations?.postalCode}
                </div>
                <div>
                  <Link
                    href={
                      professional.userProfessional?.locations?.googleMapsUrl ||
                      "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Ver en Google Maps
                  </Link>
                </div>
              </div>

              <hr />

              {/* Información de contacto */}
              <div className="text-lg font-light text-neutral-500">
                <strong>Contacto:</strong>
                {professional.userProfessional?.contact && (
                  <div className="flex flex-col gap-2 mt-2">
                    {professional.userProfessional.contact.phoneNumber && (
                      <div className="text-neutral-700">
                        Teléfono:{" "}
                        {professional.userProfessional.contact.phoneNumber}
                      </div>
                    )}
                    {professional.userProfessional.contact.linkedinUrl && (
                      <div className="text-neutral-700">
                        LinkedIn:{" "}
                        <Link
                          href={
                            professional.userProfessional.contact.linkedinUrl
                          }
                          target="_blank"
                          className="text-blue-500"
                        >
                          {professional.userProfessional.contact.linkedinUrl}
                        </Link>
                      </div>
                    )}
                    {professional.userProfessional.contact.instagramUrl && (
                      <div className="text-neutral-700">
                        Instagram:{" "}
                        <Link
                          href={
                            professional.userProfessional.contact.instagramUrl
                          }
                          target="_blank"
                          className="text-blue-500"
                        >
                          {professional.userProfessional.contact.instagramUrl}
                        </Link>
                      </div>
                    )}
                    {professional.userProfessional.contact.facebookUrl && (
                      <div className="text-neutral-700">
                        Facebook:{" "}
                        <Link
                          href={
                            professional.userProfessional.contact.facebookUrl
                          }
                          target="_blank"
                          className="text-blue-500"
                        >
                          {professional.userProfessional.contact.facebookUrl}
                        </Link>
                      </div>
                    )}
                    {professional.userProfessional.contact.tiktokUrl && (
                      <div className="text-neutral-700">
                        TikTok:{" "}
                        <Link
                          href={professional.userProfessional.contact.tiktokUrl}
                          target="_blank"
                          className="text-blue-500"
                        >
                          {professional.userProfessional.contact.tiktokUrl}
                        </Link>
                      </div>
                    )}
                    {professional.userProfessional.contact.youtubeUrl && (
                      <div className="text-neutral-700">
                        YouTube:{" "}
                        <Link
                          href={
                            professional.userProfessional.contact.youtubeUrl
                          }
                          target="_blank"
                          className="text-blue-500"
                        >
                          {professional.userProfessional.contact.youtubeUrl}
                        </Link>
                      </div>
                    )}
                    {professional.userProfessional.contact.xUrl && (
                      <div className="text-neutral-700">
                        X (Twitter):{" "}
                        <Link
                          href={professional.userProfessional.contact.xUrl}
                          target="_blank"
                          className="text-blue-500"
                        >
                          {professional.userProfessional.contact.xUrl}
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Precio por sesión y detalles de la sesión */}
            <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden p-6">
              <div className="text-2xl font-bold text-gray-900">
                $ {professional.sessionDetails?.price}
              </div>
              <div className="font-light text-neutral-500 mb-4">por sesión</div>

              <div className="text-lg font-semibold text-gray-800">
                Horarios:
              </div>
              <div className="flex flex-row gap-6 font-light text-neutral-500">
                <div>De: {professional.sessionDetails?.openingHours}</div>
                <div>A: {professional.sessionDetails?.closingHours}</div>
              </div>

              <hr className="my-4" />

              {professional.sessionDetails?.consultationFormat && (
                <div className="text-lg font-semibold text-gray-800">
                  Formato de consulta:
                  <div className="text-neutral-500">
                    {professional.sessionDetails?.consultationFormat ===
                    "in_person"
                      ? "Presencial"
                      : professional.sessionDetails?.consultationFormat ===
                        "online"
                      ? "En línea"
                      : "Ambos"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProfessionalIdPage;
