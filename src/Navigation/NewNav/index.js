import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import Customer from "./Customer";
import Provider from "./Provider";
import CheckAuth from "./CheckAuth";
 
const App = createSwitchNavigator({
  CheckAuth,
  Merchant: Provider,
  Customer: Customer
});
export default createAppContainer(App);





/*

guest or customer

Check User

Home for Customer stack {home, category, product}
Auth stack (logicalExpression, register)
language
chat stack
about us
terms
exit
profile
notification
favourite

marchent
home
products
notifications
chat stack
profile
terms
about us
add prodct

*/
