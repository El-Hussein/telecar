
// marchent
// home
// products
// notifications
// chat stack
// profile
// terms
// about us
// add prodct
import React from 'react';
import {
    I18nManager,
} from 'react-native'

import Home from '../../screens/vendor/Home';
import AddProduct from '../../screens/vendor/AddProduct';
import Products from './ProductStack';
import Chat from './Chat';
import Aboutus from '../../screens/common/Aboutus';
import TermsAndConditions from '../../screens/common/TermsAndConditions';
import Notifications from '../../screens/common/Notifications';
import Content from '../../Components/ContentDrawer';
import { width } from '../../config';

import { createDrawerNavigator } from 'react-navigation';

const Provider = createDrawerNavigator({
    HomeProvider       : Home,
    AddProduct          : AddProduct,
    Chat                : Chat,
    Aboutus             : Aboutus,
    Products            : Products,
    TermsAndConditions  : TermsAndConditions,
    Notifications       : Notifications,
},
{
    contentComponent:props => <Content {...props}/>,
    drawerPosition: I18nManager.isRTL? 'right' : 'left', 
    drawerWidth:width*0.85,
    overlayColor:0, 
}
)

export default (Provider);