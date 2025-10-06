import PropTypes from 'prop-types'

const IngridientLists = (props) => {
    const ingredientArray = props.array.map(list => <li key={list}>{list}</li>)
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientArray}</ul>

            {props.array.length > 3 && <div className="get-recipe-container">
                <div ref={props.ref}> 
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe</button>
            </div>}
        </section>
    )
}

IngridientLists.propTypes = {
    array: PropTypes.arrayOf(PropTypes.string).isRequired,
    getRecipe: PropTypes.func.isRequired,
    ref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any })
    ])
}

export default IngridientLists