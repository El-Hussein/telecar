import { Dimensions } from "react-native";
export const { width, height } = Dimensions.get("window");
export const guidelineBaseWidth = 360;
export const guidelineBaseHeight = 640;
export const scale = size => (width / guidelineBaseWidth) * size;
export const verticalScale = size => (height / guidelineBaseHeight) * size;
const defaultFactor = width > guidelineBaseWidth ? 0.5 : 1.25;
export const moderateScale = (size, factor = defaultFactor) =>
  size + (scale(size) - size) * factor;
export const colors = {
  // // main: "#52A236",
  // main: "#4d90fe",
  // mainDark: "#1E4895",
  // BackGround: "#F1FEFF",
  // white: "#ffffff",
  // Gray: "#837c83",
  
  main:'#2D88BD',
  white:'white',
  black:'black',
  gray:'gray',
  cyan:'#00AEEF',
  notifyColor:'#F85F2A',
  secondary:'#FCA61F',
};

//new designs
export const COLORS = {
  main:'#2D88BD',
  white:'white',
  black:'black',
  gray:'gray',
  cyan:'#00AEEF',
  notifyColor:'#F85F2A',
  secondary:'#FCA61F',
}