import { extendTheme } from "native-base";

export const DefaultTheme = extendTheme({
  colors: {        
  },
  components: {
    Button: {
      defaultProps: {  
        rounded: "full",           
      },     
    },
    Input:{
      defaultProps: {
        bg:"#fff"
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