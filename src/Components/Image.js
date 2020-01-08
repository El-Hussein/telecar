import React from "react";
import Image from "react-native-image-progress";
import ProgressBar from "react-native-progress/Pie";
import { colors } from "../config";

const ImageComponent = props => {
  return (
    <Image
      indicator={ProgressBar}
      indicatorProps={{
        color: colors.mainDark,
        unfilledColor: "rgba(200, 200, 200, 0.2)"
      }}
      resizeMode="stretch"
      {...props}
    />
  );
};

export default ImageComponent;
