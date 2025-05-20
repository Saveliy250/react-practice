import {BrowserRouter, Route, Routes} from "react-router-dom";
import Posts from "./pages/Posts";
import About from "./pages/About";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/about'} element={<About />} />
                <Route path={'/posts'} element={<Posts />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;