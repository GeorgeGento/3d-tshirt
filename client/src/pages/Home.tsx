import { motion } from "framer-motion"
import { useSnapshot } from "valtio"
import { Link } from "react-router-dom"

import {
    headContainerAnimation, headContentAnimation,
    headTextAnimation, slideAnimation
} from "../utils/motion"
import state from "../store"
import { Button } from "../components/Button"

const HomePage = () => {
    const snap = useSnapshot(state);

    return (
        <motion.section className="home" {...slideAnimation("left")}>
            <motion.header {...slideAnimation("down")}>
                <img src="./threejs.png" alt="logo" className="h-8 w-8 object-contain" />
            </motion.header>

            <motion.div className="home-content" {...headContainerAnimation}>
                <motion.div {...headTextAnimation}>
                    <h1 className="head-text">
                        LET'S <br className="hidden xl:block" /> DO IT.
                    </h1>
                </motion.div>

                <motion.div className="flex flex-col gap-5 items-center" {...headContentAnimation}>
                    <p className="max-w-md font-normal text-gray-600 text-base">
                        Create your unique and exclusive shirt with our
                        brand-new 3D customization tool. <strong>Unleash your imagination</strong>
                        {" "}and defineyour own style.
                    </p>

                    <Link to="/customize">
                        <Button variant="filled" onClick={() => state.intro = false}>
                            Customize it
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.section>
    )
}

export default HomePage