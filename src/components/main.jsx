import { useRef, useState } from "react"
import ClaudeRecipe from "./claudeRecipe"
import IngridientLists from "./ingridentList"
import { getRecipeFromGemini } from "../ai"

const Main = () => {
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const recipeSection = useRef(null)

    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newIngredient = formData.get("ingredient")
        
        if (newIngredient.trim()) {
            setIngredients(prev => [...prev, newIngredient])
            e.target.reset()
        }
    }

    async function getRecipe(){
        setIsLoading(true)
        console.log("waiting for recipe....")
        const recipeMarkdown = await getRecipeFromGemini(ingredients)
        setRecipe(recipeMarkdown)
        setIsLoading(false)
    }

    function clearAll() {
        setIngredients([])
        setRecipe("")
    }

    return (
        <main>
            <form onSubmit={submit} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. orange"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button type="submit">Add ingredient</button>
            </form>
            
            {ingredients.length > 0 &&
                <IngridientLists 
                    ref={recipeSection}
                    array={ingredients} 
                    getRecipe={getRecipe}
                />
            }

            {isLoading && (
                <div className="thinking-container">
                    <div className="thinking-animation">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <p className="thinking-text">Jeremiah is thinking...</p>
                </div>
            )}

            {recipe && <ClaudeRecipe recipe={recipe} />}

            {(ingredients.length > 0 || recipe) && (
                <button onClick={clearAll} className="clear-btn">
                    Clear All
                </button>
            )}
        </main>
    )
}
export default Main