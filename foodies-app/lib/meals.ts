import sql from "better-sqlite3";

const db = new sql("meals.db");

export async function getMeals() {
  await new Promise((res) => setTimeout(res, 1000));

  const meals = db.prepare("SELECT * FROM meals").all();
  return meals;
}

export interface IMeal {
  id: number;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export function getMeal(slug: string): IMeal {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as IMeal;
}
