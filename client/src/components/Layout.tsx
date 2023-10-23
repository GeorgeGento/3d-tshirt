import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import HomePage from "../pages/Home"
import Customizer from "../pages/Customizer"
import CanvasModel from "./canvas"
import state from "@/store"

const Layout = () => {
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes("/customize")) state.intro = false;
    }, [])


    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/customize" element={<Customizer />} />
            </Routes>
            <CanvasModel />
        </AnimatePresence>
    )
}

export default Layout