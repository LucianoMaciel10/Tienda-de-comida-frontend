/* eslint-disable react/react-in-jsx-scope */

import { RiSearchLine } from "react-icons/ri";
import Dishes from "./Dishes";
import { useContext, useState } from "react";
import { categorys, Meal } from "../types";
import { AppContext } from "../contexts/OrdersContext";

function Home() {
  const [inputSearch, setInputSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [meals, setMeals] = useState<Meal[]>([])
  const [category, setCategory] = useState<categorys>("Beef");

  const context = useContext(AppContext)

  if (!context) {
    throw new Error('Error en la solicitud de datos para el componente Home')
  }

  const {setError, error} = context

  const handelKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setLoading(true)
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => {
          if (!res.ok) {
            // Lanza un error si la respuesta no es exitosa
            throw new Error(`Error en la solicitud: ${res.status}`);
          }
          return res.json()
        })
        .then(data => {
          const filterMeals = data.meals.filter((meal: Meal) => meal.strMeal.toLowerCase().includes(inputSearch.toLowerCase()))
          setMeals(filterMeals || [])
        })
        .catch((error) => {
          setError(error.message);
          setMeals([])
        })
        .finally(() => setLoading(false))
    }
  }

  return (
    <div className="min-1500px:col-span-6 lg:col-span-8 h-full lg:px-6 max-lg:mb-10">
      <header className="mb-20">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl text-gray-200">Luciano Restaurant</h1>
            <p className="text-gray-400">Wednesday, 13 Nov 2024</p>
          </div>
          <form
            className="mt-4 mb-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="w-full relative flex items-center">
              <RiSearchLine className="absolute left-3" color="#fff" />
              <input
                className="bg-[#1E1D29] pl-10 pr-4 py-2 rounded-lg w-full outline-none text-white"
                type="text"
                placeholder="Search for food"
                value={inputSearch}
                onChange={(event) => setInputSearch(event.target.value)}
                onKeyDown={(event) => handelKeyDown(event)}
              />
            </div>
          </form>
        </div>
        <nav className="text-gray-300 flex items-center justify-between border-b-[1px] border-gray-700 relative font-bold md:justify-start">
          {/* Menú de categorías */}
          <a
            onClick={(event) => {
              event.preventDefault();
              setCategory("Beef");
            }}
            className={`py-2 box px-4 ${
              category === "Beef"
                ? "border-b-[1px] border-b-[#DD8270] text-[#DD8270]"
                : "border-b-[1px] border-b-transparent"
            }`}
            href=""
          >
            Beef
          </a>
          <a
            onClick={(event) => {
              event.preventDefault();
              setCategory("Pasta");
            }}
            className={`py-2 px-4 ${
              category === "Pasta"
                ? "border-b-[1px] border-[#DD8270] text-[#DD8270]"
                : "border-b-[1px] border-b-transparent"
            }`}
            href=""
          >
            Pasta
          </a>
          <a
            onClick={(event) => {
              event.preventDefault();
              setCategory("Chicken");
            }}
            href=""
            className={`py-2 px-4 ${
              category === "Chicken"
                ? "border-b-[1px] border-[#DD8270] text-[#DD8270]"
                : "border-b-[1px] border-b-transparent"
            }`}
          >
            Chicken
          </a>
          <a
            onClick={(event) => {
              event.preventDefault();
              setCategory("Dessert");
            }}
            href=""
            className={`py-2 px-4 ${
              category === "Dessert"
                ? "border-b-[1px] border-[#DD8270] text-[#DD8270]"
                : "border-b-[1px] border-b-transparent"
            }`}
          >
            Dessert
          </a>
        </nav>
      </header>
      <Dishes
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        meals={meals}
        setMeals={setMeals}
        category={category}
      />
    </div>
  );
}

export default Home;
