"use client";

interface Params {
  error: Error;
}

export default function MealsError({ error }: Params) {
  return (
    <div className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data, please try again later</p>
    </div>
  );
}
