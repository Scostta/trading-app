import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    config: {
        initialColorMode: "dark"
    },
    styles: {
        global: {
            // styles for the `body`
            body: {
                bg: '#1C1C1C',
                color: 'white',
            },
        },
    },
    colors: {
        brand: {
            100: "#DBB66B",
            200: "#DBB66B",
            300: "#B89450",
            400: "#DBB66B",
            500: "#DBB66B",
            600: "#DBB66B",
            700: "#DBB66B",
            800: "#DBB66B",
            900: "#DBB66B",
        },
        myRed: {
            100: "#F64527",
            200: "#F64527",
            300: "#F64527",
            400: "#F64527",
            500: "#F64527",
            600: "#F64527",
            700: "#F64527",
            800: "#F64527",
            900: "#F64527",
        },
        myGreen: {
            100: "#89C64D",
            200: "#89C64D",
            300: "#89C64D",
            400: "#89C64D",
            500: "#89C64D",
            600: "#89C64D",
            700: "#89C64D",
            800: "#89C64D",
            900: "#89C64D",
        },
        myOrange: {
            100: "#D8AE5E",
            200: "#D8AE5E",
            300: "#D8AE5E",
            400: "#D8AE5E",
            500: "#D8AE5E",
            600: "#D8AE5E",
            700: "#D8AE5E",
            800: "#D8AE5E",
            900: "#D8AE5E",
        }
    },
})

export default theme