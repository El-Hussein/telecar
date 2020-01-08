/**
 * @format
 */

import { AppRegistry, YellowBox } from "react-native";
//import App from "./paytabs";

import App from "./App";
import { name as appName } from "./app.json";
YellowBox.ignoreWarnings(["Warning: ..."]);
console.disableYellowBox = true;
console.ignoredYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
