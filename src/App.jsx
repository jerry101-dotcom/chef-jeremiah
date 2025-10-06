
import './App.css'
import Header from "./components/header"
import Main from "./components/main"
import { StrictMode} from 'react'


const App=()=>{

    return(
    <StrictMode>
        <Header />
        <Main />
    </StrictMode>
    )   
}

export default App