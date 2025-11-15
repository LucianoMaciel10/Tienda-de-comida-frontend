/* eslint-disable react/react-in-jsx-scope */

import { useEffect } from "react";
import { Meal, type categorys } from "../types";
import MealCard from "./MealCard";

interface Props {
  meals: Meal[]
  category: categorys;
  loading: boolean
  error: string | null
  setError: (error: string | null) => void
  setLoading: (state: boolean) => void
  setMeals: (meals: Meal[]) => void
}

const Dishes = ({ category, error, setError, meals, setMeals, loading, setLoading }: Props): JSX.Element => {

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((res) => {
      if (!res.ok) {
        // Lanza un error si la respuesta no es exitosa
        throw new Error(`Error en la solicitud: ${res.status}`);
      }
      return res.json();
    })
      .then((data) => {
        setMeals(data.meals || [])
      })
      .catch((error) => {
        setError(error.message);
        setMeals([]); // Asegúrate de manejar errores limpiamente
      })
      .finally(() => {
        setLoading(false); // Finaliza el estado de carga
      })
  }, [category]);

  if (loading) return <img src="../public/loading.gif" className="w-12 mx-auto" alt="Cargando..." />
  if (error) return <p className="text-red-400 text-center">{error}</p>;
  if (!meals.length) return <p className="text-white text-center">No se encontraron platos para esta busqueda</p>;

  return (
    <ul className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {
        meals.length > 0 &&
          meals.map((meal) => (
            <li key={meal.idMeal} className={`bg-[#1E1D29] p-8 rounded-lg flex flex-col items-center mb-20 text-white text-center w-[80%] h-[27rem] justify-between `}>
              <MealCard img={meal.strMealThumb} name={meal.strMeal} id={meal.idMeal}  />
            </li>
          ))
      }
    </ul>
  )
};

export default Dishes;
