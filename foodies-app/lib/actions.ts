"use server";

import { redirect } from "next/navigation";
import { CreateMealDto, saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text: string): boolean {
  return !text || text.trim() === "";
}

export const shareMeal = async (formData: FormData) => {
  "use server";

  const meal: Omit<CreateMealDto, "id"> = {
    slug: formData.get("title") as string,
    title: formData.get("title") as string,
    image: formData.get("image") as File,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid Input",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
};
