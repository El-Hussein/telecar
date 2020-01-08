import { createStackNavigator } from "react-navigation";
import Main from "./Main";
import { Login, Register } from "../Common";
import OpenDeals from "./OpenDeals";
import AcceptedDeals from "./AcceptedDeals";
import DealDetails from "./DealDetails";
import SendDeal from "./SendDeal";
import EditeProfile from "../Common/EditeProfile";
import ChangePassword from "../Common/ChangePassword";
import CallUs from "../Common/CallUs";
import About from "../Common/About";
import Policy from "../Common/Policy";
import Chat from "../Common/Chat";
import Product from "../Common/Product";
import Profile from "./Profile";
import ProfileSettings from "../Common/ProfileSetting";
import DealFollow from "./DealFollow";
import Charge from "../Common/Charge";
import MyMessages from "../Common/MyMessages";
import MyServices from "./MyServices";
import MyProducts from "./MyProducts";
import AddProduct from "./AddProduct";
import Notifications from "./notifications";
export default createStackNavigator(
  {
    Profile: Profile,
    MyServices: MyServices,
    DealDetails: DealDetails,
    AcceptedDeals: AcceptedDeals,
    OpenDeals: OpenDeals,
    Provider: Main,
    EditeProfile: EditeProfile,
    ProfileSettings: ProfileSettings,
    ChangePassword: ChangePassword,
    CallUs: CallUs,
    About: About,
    Policy: Policy,
    DealFollow,
    Charge,
    SendDeal,
    Chat,
    MyMessages,
    MyProducts,
    AddProduct,
    Notifications,
    Product
  },
  {
    // initialRouteName: "MyProducts",
    headerMode: "none"
  }
);
