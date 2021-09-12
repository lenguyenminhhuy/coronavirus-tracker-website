// theme.js
// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react"
// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const Radio = {
  baseStyle: {
    borderRadius: "base",
    borderColor: "black"
  }
}


// 3. extend the theme
const theme = extendTheme({ config, components: {Radio} })
export default theme