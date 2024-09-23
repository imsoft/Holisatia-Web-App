import Image from "next/image";
import { TbCalendar, TbPlant2 } from "react-icons/tb";
import { WiStars } from "react-icons/wi";

const WhatIsHolistiaPage = () => {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-white px-6 py-6 sm:py-8 lg:overflow-visible lg:px-0">
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-sky-600">
                  Holistia
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  ¿Quienes somos?
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  En Holistia, creemos en un enfoque integral para el bienestar
                  y el desarrollo personal. Somos una comunidad comprometida en
                  ayudarte a encontrar equilibrio entre mente, cuerpo y espíritu
                  a través de servicios personalizados y experiencias
                  transformadoras. Nuestra misión es conectar a personas con
                  expertos en prácticas holísticas para mejorar su calidad de
                  vida de manera consciente y equilibrada.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <Image
              alt="Holistia"
              src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              width={1140}
              height={760}
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                  Nuestra plataforma no solo ofrece servicios, sino una
                  comunidad que apoya y comparte el mismo propósito: vivir de
                  manera más consciente y equilibrada. Al unirte a Holistia,
                  accedes a un entorno donde podrás conectar con personas que
                  comparten tus intereses, aprender nuevas prácticas y recibir
                  el apoyo necesario para alcanzar tus metas de bienestar.
                </p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <TbPlant2
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 flex-none text-sky-600"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Acceso a expertos holísticos
                      </strong>{" "}
                      Conéctate con profesionales en diversas áreas del
                      bienestar, desde terapias alternativas hasta prácticas de
                      meditación y sanación energética, todo en un solo lugar.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <WiStars
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 flex-none text-sky-600"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Experiencias personalizadas
                      </strong>{" "}
                      Cada camino hacia el bienestar es único. Ofrecemos
                      programas y servicios adaptados a tus necesidades
                      individuales para ayudarte a alcanzar un equilibrio
                      integral.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <TbCalendar
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 flex-none text-sky-600"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Agenda flexible y accesible
                      </strong>{" "}
                      Reserva tus sesiones y actividades en el horario que mejor
                      se ajuste a tu rutina, con la facilidad de manejar todo
                      desde cualquier dispositivo.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                  Creemos que el bienestar integral es un derecho, no un lujo.
                  Por eso, hemos creado un espacio accesible donde cualquiera
                  puede explorar y desarrollar su potencial, sin importar su
                  nivel de experiencia. Desde sesiones individuales hasta
                  talleres grupales, te acompañamos en cada paso de tu
                  crecimiento personal.
                </p>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                  Nada complicado.
                </h2>
                <p className="mt-6">
                  En Holistia, te ofrecemos una plataforma que no requiere
                  infraestructura técnica complicada. Desde el momento en que te
                  unes a nuestra comunidad, te damos todo lo que necesitas para
                  sumergirte en un viaje de bienestar y transformación, sin
                  preocuparte por la tecnología detrás.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatIsHolistiaPage;
