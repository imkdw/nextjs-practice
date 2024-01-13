import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

interface Params {
  meals: any[];
}

export default function MealsGrid({ meals }: Params) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
