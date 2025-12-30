

export async function getRecipeFromGemini(ingredientsArr) {
    const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`
    const ingredientsString = ingredientsArr.join(", ")
    const API_KEY = "AIzaSyCSQSBrgu_fOBzZMBZ7jNgo7TIOrxjg-jk"

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${SYSTEM_PROMPT}\n\nI have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
                        }]
                    }]
                })
            }
        )
        
        const data = await response.json()
        console.log("API Response:", data)
        
        if (data.error) {
            console.error("API Error:", data.error)
            return "Sorry, there was an error getting the recipe. Please try again."
        }
        
        return data.candidates[0].content.parts[0].text
    } catch (err) {
        console.error("Fetch error:", err.message)
        return "Sorry, there was an error getting the recipe. Please try again."
    }
}