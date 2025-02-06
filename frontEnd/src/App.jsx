import React from "react"
import { Box, Button }from "@chakra-ui/react"
import { Routes ,Route} from "react-router-dom"
import Homepage from "./pages/Homepage"
import CreatePage from "./pages/CreatePage"
import Navbar from "./component/Navbar"


function App() {
 
  return (
    <>
      <Box minH={"100vh"}>
        <Navbar/>
            <Routes>
              <Route path="/" element={ <Homepage/>} />
              <Route path="/create" element={ <CreatePage/>} />
            </Routes>
      </Box>
    </>
  )
}

export default App
