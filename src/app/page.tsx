import { getProfessionals } from "@/actions";
import { ProfessionalCard } from "@/components/professional";
import { Container, EmptyState } from "@/components/shared";

const Home = async () => {
  const professionals = await getProfessionals();

  if (professionals.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <>
      <Container>
        <div className=" pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {professionals.map((professional) => {
            return (
              <ProfessionalCard key={professional.id} data={professional} />
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Home;
