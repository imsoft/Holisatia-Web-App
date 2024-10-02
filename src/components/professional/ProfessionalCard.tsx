"use client";

import Image from "next/image";
import { Professional } from "@prisma/client";
import { useRouter } from "next/navigation";
import { HeartButton } from "../shared";
import { useSession } from "next-auth/react";

interface ProfessionalCardProps {
  data: Professional & {
    userProfessional: {
      name: string | null;
      email: string | null;
      image: string | null;
    } | null;
  };
}

export const ProfessionalCard = ({ data }: ProfessionalCardProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div
      onClick={() => router.push(`/profesionales/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            priority
            alt={data.userProfessional?.name || "Professional"}
            src={
              data.userProfessional?.image ||
              "https://res.cloudinary.com/dwibt7nyu/image/upload/v1726956023/placeholder_alfgtk.png"
            }
            className="object-cover h-full w-full group-hover:scale-110 transition"
            width={500}
            height={500}
          />

          <div className="absolute top-3 right-3">
            <HeartButton professionalId={data.id} currentUser={session?.user} />
          </div>
        </div>

        <div className="font-semibold text-lg">
          {data.userProfessional?.name}
        </div>

        <div className="font-light text-neutral-500">
          {data.userProfessional?.email}
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">{data.specialty}</div>
        </div>
      </div>
    </div>
  );
};
