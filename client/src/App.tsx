import { BrowserRouter } from "react-router-dom"

import Layout from "./components/Layout"

const App = () => {
    return (
        <main className="app transition-all ease-in">
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </main>
    )
}

export default App