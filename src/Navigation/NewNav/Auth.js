import { createStackNavigator } from 'react-navigation';

import Register from '../../screens/common/Register';
import Login from '../../screens/common/Login';

const Auth = createStackNavigator({
    Login    : Login,
    Register : Register,
},
{
    headerMode: 'none',
});

export default Auth;