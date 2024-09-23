import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "1",
    question: "¿Qué es Holistia?",
    answer:
      "Holistia es una plataforma de bienestar integral que conecta a usuarios con profesionales de diversas disciplinas para mejorar su salud mental, física y social. Ofrecemos una amplia gama de terapias tradicionales y alternativas, herramientas innovadoras de monitoreo y una comunidad de apoyo.",
  },
  {
    id: "2",
    question: "¿Cómo me registro en Holistia?",
    answer:
      "Puedes registrarte en Holistia a través de nuestro sitio web. Simplemente sigue las instrucciones para crear una cuenta y comenzar a explorar nuestros servicios.",
  },
  {
    id: "3",
    question: "¿Cómo funciona Holistia?",
    answer:
      "Holistia permite a los usuarios registrarse, buscar y conectarse con profesionales del bienestar, participar en retos y eventos. Nuestra plataforma utiliza inteligencia artificial para ofrecer recomendaciones personalizadas y facilitar el seguimiento del progreso de los usuarios.",
  },
  {
    id: "4",
    question: "¿Qué tipos de terapias están disponibles en Holistia?",
    answer:
      "En Holistia, ofrecemos una amplia gama de terapias, incluyendo psicoterapia, medicina holística, homeopatía, herbolaria, reiki, tai chi, medicina cuántica, medicina china y más.",
  },
  {
    id: "5",
    question: "¿Qué es la comunidad de Holistia?",
    answer:
      "La comunidad de Holistia es un espacio donde los usuarios pueden interactuar, compartir sus logros, participar en retos y recibir apoyo de otros miembros y profesionales. Fomentamos un ambiente positivo y motivador para ayudarte a alcanzar tus objetivos de bienestar.",
  },
  {
    id: "6",
    question: "¿Cómo protege Holistia mi información personal?",
    answer:
      "La seguridad de tus datos es nuestra prioridad. Utilizamos tecnología de encriptación avanzada para proteger tu información personal y seguimos estrictas políticas de privacidad para garantizar que tus datos estén seguros.",
  },
];

const FaqPage = () => {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="mx-auto mt-20 max-w-4xl">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              Preguntas frecuentes
            </h2>
            <div className="mt-10 space-y-3">
              {faqs.map((faq) => (
                <Accordion key={faq.id} type="single" collapsible>
                  <AccordionItem value={`item-${faq.id}`}>
                    <AccordionTrigger className="text-base font-semibold leading-7">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base leading-7 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;
