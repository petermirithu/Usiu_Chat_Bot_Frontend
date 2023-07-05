import { extendTheme } from "native-base";

export const DefaultTheme = extendTheme({
  colors: {
    primary: {
      50: '#e8ecff',
      100: '#bec7f6',
      200: '#93a2eb',
      300: '#6a7ce2',
      400: '#4057d8',
      500: '#283ebf',
      600: '#1d3095',
      700: '#14226c',
      800: '#0a1543',
      900: '#01071b',
    },
    secondary: {
      50: '#ecefff',
      100: '#ccd0e9',
      200: '#abb1d5',
      300: '#8992c2',
      400: '#6972b0',
      500: '#4f5996',
      600: '#3d4576',
      700: '#2a3155',
      800: '#191e35',
      900: '#070918',
    }
  },
  components: {
    Button: {
      defaultProps: {
        rounded: "full",
      },
    },
    Input: {
      defaultProps: {
        bg: "#fff"
      }
    }
  },
  fontConfig: {
    Poppins: {
      100: {
        normal: "Poppins-Thin",
        italic: "Poppins-ThinItalic",
      },
      200: {
        normal: "Poppins-ExtraLight",
        italic: "Poppins-ExtraLightItalic",
      },
      300: {
        normal: "Poppins-Light",
        italic: "Poppins-LightItalic",
      },
      400: {
        normal: "Poppins-Regular",
        italic: "Poppins-Italic",
      },
      500: {
        normal: "Poppins-Medium",
        italic: "Poppins-MediumItalic",
      },
      600: {
        normal: "Poppins-SemiBold",
        italic: "Poppins-SemiBoldItalic",
      },
      700: {
        normal: 'Poppins-Bold',
        italic: "Poppins-BoldItalic",
      },
      800: {
        normal: 'Poppins-ExtraBold',
        italic: 'Poppins-ExtraBoldItalic',
      },
      900: {
        normal: 'Poppins-Black',
        italic: 'Poppins-BlackItalic',
      },
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
})