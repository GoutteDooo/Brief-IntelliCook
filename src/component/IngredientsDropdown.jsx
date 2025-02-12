import React, { useContext, useEffect, useRef, useState } from 'react'
import ingredients from '../data/ingredients.json'
import { DarkModeContext } from './DarkModeProvider'

/**
 * Affiche la dropdownlist des ingrédients qui matchent avec la recherche de l'input
 * @param {string} search
 * @param {function} setSearch
 * @param {Personalized Hook} filterIng
 * @returns
 */
const IngredientsDropdown = ({ search, setSearch, filterIng }) => {
  const catMenu = useRef(null)
  const [openSlide, setOpenSlide] = useState(true) //menu ouvert dés qu'il est monté
  const { filteredIngredients, addIngredient, addUndesirableIngredient } =
    filterIng
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const handleCloseMenu = e => {
      if (openSlide && !catMenu.current?.contains(e.target)) {
        setOpenSlide(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleCloseMenu)
    return () => {
      document.removeEventListener('mousedown', handleCloseMenu)
    }
  }, [setSearch, openSlide])

  //Retourne la liste des ingrédients qui correspondent à la recherche sous l'input
  const findIngredients = value => {
    if (!value) return null
    const newIngredientsListTemp = Object.keys(ingredients).filter(key =>
      key.includes(value.toLowerCase()),
    )

    if (newIngredientsListTemp.length === 0) return null
    const newIngredientsList = newIngredientsListTemp.filter(
      newI => !filteredIngredients.includes(newI),
    )

    return newIngredientsList.length ? newIngredientsList : null
  }

  return (
    findIngredients(search) &&
    openSlide && (
      <div
        className={`ingredientsDropdown ${
          darkMode && 'ingredientsDropdownDark'
        }`}
        ref={catMenu}
      >
        {findIngredients(search).map((ingredient, i) => (
          <div key={i} className='ingredientsDropdown__content'>
            <span>{ingredient}</span>
            <div className='ingredientsDropdown__content__buttons'>
              <button onClick={() => addIngredient(ingredient)}>+</button>
              <button onClick={() => addUndesirableIngredient(ingredient)}>
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  )
}

export default IngredientsDropdown
