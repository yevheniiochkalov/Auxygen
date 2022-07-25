import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme } from 'styled-components';
import { Dimensions, PixelRatio } from 'react-native';
import {
  indigo900,
  grey500,
  deepPurpleA700,
  orange700,
  indigoA700,
  grey300,
  grey200,
  cyan400,
  blueA700,
  blueA900,
  blueA800,
  deepPurple900,
  deepPurple800,
  white,
  cyanB,
} from './colors';

const { width, height } = Dimensions.get('window');

const pixelRatioW = PixelRatio.getPixelSizeForLayoutSize(width);
const pixelRatioH = PixelRatio.getPixelSizeForLayoutSize(height);
const screenSize = Math.sqrt(width * height) / 100;

const scaleW = (size) => (pixelRatioW / width) * size;
const scaleH = (size) => (pixelRatioH / height) * size;

export {
  width, height, scaleW, scaleH, screenSize, pixelRatioW, pixelRatioH,
};

export const theme = {
  ...PaperDefaultTheme,
  roundness: 40,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: deepPurple800,
    accent: orange700,
    surface: blueA800,
    text: grey300,
  },
  fonts: {
    ...PaperDefaultTheme.fonts,
    regular: {
      fontFamily: 'Montserrat_400Regular',
    },
    medium: {
      fontFamily: 'Montserrat_500Medium',
    },
  },
};

// STYLED COMPONENTS THEME

export interface ThemeInterface extends DefaultTheme {}
// need to change the DefaultTheme interface in  ../types/styled.d.ts
/*
import { useContext } from "react";
import { ThemeContext } from "styled-components";
const themeContext = useContext(ThemeContext);
*/

export const SCtheme: ThemeInterface = {
  colors: {
    background: blueA800,
    backgroundContrast: blueA900,
    primary: deepPurple800,
    accent: orange700,
    accentTwo: cyanB,
    accent3: cyanB,
    text: grey200,
    darkText: grey500,
    transparent: 'rgba(10, 17, 96, 0.01)',
    simpleWhite: white,
  },
};
