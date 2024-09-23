import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

export const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="rounded-full"
      height={22}
      width={22}
      alt="avatar"
      src={
        src ||
        "https://res.cloudinary.com/dwibt7nyu/image/upload/v1726956023/placeholder_alfgtk.png"
      }
    />
  );
};
