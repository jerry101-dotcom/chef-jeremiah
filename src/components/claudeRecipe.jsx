// claudeRecipe.jsx
import ReactMarkdown from "react-markdown"
import PropTypes from 'prop-types'

const ClaudeRecipe = (props) => {
    return (
        <section aria-live="polite" className="suggested-recipe-container">
            <h2>Jeremiah{`'`}s Recommendation</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}

ClaudeRecipe.propTypes = {
    recipe: PropTypes.string.isRequired
}

export default ClaudeRecipe
