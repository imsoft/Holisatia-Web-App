"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { FiEdit } from "react-icons/fi";
import { ImagesIcon } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks";

interface ImageInputProps {
  id: string;
  initialData: User;
}

// Cloudinary configuration
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dwibt7nyu/image/upload`;
const uploadPreset = "kkylqqdn";

const formSchema = z.object({
  profileImage: z.string().optional(), // Solo una imagen opcional
});

export const ImageInput = ({ id, initialData }: ImageInputProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  );
  const [image, setImage] = useState<File | null>(null);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { profileImage: initialData?.image || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  // Handle image change
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async (file: File, userId: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    // Set public_id based on user ID
    const publicId = `users/${userId}/profile/${file.name.split(".")[0]}`;
    formData.append("public_id", publicId);

    try {
      const response = await axios.post(cloudinaryUrl, formData, {
        params: {
          folder: `users/${userId}`, // Ensure the image is uploaded to the user's folder
        },
      });
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let imageUrl = imagePreview;

      if (image) {
        // Upload image to Cloudinary if a new one is selected
        imageUrl = await uploadImageToCloudinary(image, id);
      }

      const updatedValues = {
        ...values,
        image: imageUrl, // Set the image URL in the updated values
      };

      // Update the user with the new image URL
      await axios.patch(`/api/user/personal/${id}`, updatedValues);
      toast({
        variant: "success",
        title: "¡Información actualizada!",
        description: "Imagen de perfil actualizada exitosamente.",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Algo salió mal.",
        description: "Por favor intenta de nuevo.",
      });
    }
  };

  return (
    <>
      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
        <div className="pt-6 sm:flex">
          <dt className="font-medium flex items-center text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Imagen del consultorio
          </dt>
          <dd className="mt-1 flex justify-between items-center gap-x-6 sm:mt-0 sm:flex-auto">
            {isEditing ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex items-center w-full"
                >
                  <div className="flex w-full">
                    <div className="mt-2 flex justify-center w-full rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center w-full">
                        {imagePreview ? (
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            className="h-auto w-auto mx-auto object-cover rounded-md"
                            width={96}
                            height={96}
                          />
                        ) : (
                          <ImagesIcon className="mx-auto h-12 w-12 text-gray-300" />
                        )}
                        <div className="mt-4 text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 hover:text-blue-500"
                          >
                            <span>Subir imagen de perfil</span>
                            <Input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={onImageChange}
                              disabled={isSubmitting}
                            />
                          </label>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          Sube una imagen PNG o JPG de hasta 10MB
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-2">
                      <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        variant={"accept"}
                      >
                        Aceptar
                      </Button>
                      <Button
                        type="button"
                        variant={"outline"}
                        onClick={toggleEdit}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            ) : (
              <Image
                src={initialData.image || "/images/placeholder.png"}
                alt={
                  initialData.name ||
                  "https://res.cloudinary.com/dwibt7nyu/image/upload/v1726956023/placeholder_alfgtk.png"
                }
                className="h-auto w-auto rounded-xl"
                width={100}
                height={100}
              />
            )}

            {!isEditing && (
              <Button className="gap-2" type="button" onClick={toggleEdit}>
                <FiEdit />
                Editar
              </Button>
            )}
          </dd>
        </div>
      </dl>
    </>
  );
};
