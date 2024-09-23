"use client";

import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { Avatar } from "../shared";
import { LogInDialog, RegisterDialog } from "../auth";
import { useCurrentUser, useLoginDialog, useRegisterDialog } from "@/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { logout } from "@/actions";

const firstSectionMenu = [
  {
    label: "Mis doctores",
    href: "/",
  },
  {
    label: "Mis favoritos",
    href: "/",
  },
  {
    label: "Mis citas",
    href: "/",
  },
  {
    label: "Configuración",
    href: "/configuracion",
  },
];

const secondSectionMenu = [
  {
    label: "¿Qué es Holistia?",
    href: "/que-es-holistia",
  },
  {
    label: "Profesionales",
    href: "/profesionales",
  },
  {
    label: "Centros Wellness",
    href: "/centros-wellness",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
];

export const UserMenu = () => {
  const { onOpen: openLogin } = useLoginDialog();
  const { onOpen: openRegister } = useRegisterDialog();

  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full gap-2">
            <div className="hidden md:block">
              <Avatar src={""} />
            </div>
            <IoMenu size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {user && (
            <>
              <DropdownMenuLabel>¡Hola!, {user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}

          {!user ? (
            <>
              <DropdownMenuItem onClick={openLogin}>
                Iniciar sesión
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openRegister}>
                Registrarse
              </DropdownMenuItem>
            </>
          ) : (
            firstSectionMenu.map((item, index) => (
              <Link key={index} href={item.href}>
                <DropdownMenuItem>{item.label}</DropdownMenuItem>
              </Link>
            ))
          )}

          <DropdownMenuSeparator />
          {secondSectionMenu.map((item, index) => (
            <Link key={index} href={item.href}>
              <DropdownMenuItem>{item.label}</DropdownMenuItem>
            </Link>
          ))}
          {user && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onClick}>
                Cerrar sesión
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Diálogos */}
      <LogInDialog />
      <RegisterDialog />
    </>
  );
};
