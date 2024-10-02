"use client";

import { FaUserCheck } from "react-icons/fa";
import { Categories, Logo, UserMenu, UserTypeButton } from ".";
import { Container, ProfessionalDialog } from "../shared";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: session, status } = useSession();

  const currentUser = session?.user?.id ? { id: session.user.id } : null;

  return (
    <>
      <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 border-b-[1px]">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <div className="flex flex-row gap-2">
                <UserTypeButton icon={FaUserCheck} />
                {/* <UserTypeButton title={"¿Eres centro wellness?"} /> */}
                {/* <UserTypeButton title={"¿Eres comunidad?"} /> */}
              </div>
              <Logo />
              <UserMenu />
            </div>
            <Categories />
          </Container>
        </div>
      </div>

      {/* Incluye el diálogo */}
      <ProfessionalDialog currentUser={currentUser} />
    </>
  );
};
