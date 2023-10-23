import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { useSnapshot } from "valtio"

import state from "@/store/index"
import { fadeAnimation, slideAnimation } from '@/utils/motion'
import { Button } from '@/components/Button'
import { Link } from 'react-router-dom'
import EditorTabs from '@/components/customizer/EditorTabs'
import FilterTabs from '@/components/customizer/FilterTabs'

const Customizer = () => {
  return (
    <div>
      <motion.div key="custom" className='absolute top-0 left-0 z-10' {...slideAnimation("left")}>
        <div className='flex items-center min-h-screen'>
          <EditorTabs />
        </div>
      </motion.div>

      {/** Back button */}
      <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
        <Link to="/">
          <Button variant="filled" onClick={() => state.intro = true}>
            Go back
          </Button>
        </Link>
      </motion.div>

      {/** Filters */}
      <motion.div className="filtertabs-container" {...slideAnimation("up")}>
        <FilterTabs />
      </motion.div>
    </div>
  )
}

export default Customizer