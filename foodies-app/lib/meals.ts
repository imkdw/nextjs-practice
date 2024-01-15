import sql from "better-sqlite3";
const db = new sql("meals.db");
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

export async function getMeals() {
  await new Promise((res) => setTimeout(res, 1000));

  const meals = db.prepare("SELECT * FROM meals").all();
  return meals;
}

export interface MealEntity {
  id: number;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export function getMeal(slug: string): MealEntity {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as MealEntity;
}

export interface CreateMealDto {
  slug: string;
  title: string;
  image: File;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export async function saveMeal(dto: CreateMealDto) {
  const createMealDto = { ...dto, image: dto.image.name };
  createMealDto.slug = slugify(createMealDto.title, { lower: true });
  createMealDto.instructions = xss(createMealDto.instructions);

  const extension = dto.image.name.split(".").pop();
  const fileName = `${createMealDto.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferImage = await dto.image.arrayBuffer();
  stream.write(Buffer.from(bufferImage), (error) => {
    if (error) {
      throw new Error("Saveing Image Failed", error);
    }
  });

  createMealDto.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
    (title, slug, image, summary, instructions, creator, creator_email)
    VALUES (
      @title,
      @slug,
      @image,
      @summary,
      @instructions,
      @creator,
      @creator_email
   )
   `
  ).run(createMealDto);
}
