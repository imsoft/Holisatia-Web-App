"use client";

import { useProfessionalDialog } from "@/hooks";
import { IconType } from "react-icons";

interface UserTypeButtonProps {
  icon?: IconType;
}

export const UserTypeButton = ({ icon: Icon }: UserTypeButtonProps) => {
  const { onOpen } = useProfessionalDialog();

  return (
    <>
      <div
        onClick={onOpen}
        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full bg-sky-400 text-white hover:bg-sky-100 hover:text-sky-500 transition cursor-pointer"
      >
        {Icon && <Icon size={20} />}
      </div>
    </>
  );
};
