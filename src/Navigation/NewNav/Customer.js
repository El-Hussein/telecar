
// Home for Customer stack {home, category, product}
// Auth stack (logicalExpression, register)
// language
// chat stack
// about us
// terms
// exit
// profile
// notification
// favourite
import React from 'react';
import {
    I18nManager,
} from 'react-native'
import { createDrawerNavigator } from 'react-navigation';

import Home from './HomeCustomer';
import Auth from './Auth';
// import Chat from './Chat';
import Aboutus from '../../screens/common/Aboutus';
import TermsAndConditions from '../../screens/common/TermsAndConditions';
import Notifications from '../../screens/common/Notifications';
import Favourite from '../../screens/customer/Favourite';
import AllOffers from '../../screens/customer/AllOffers';
import Search from '../../screens/customer/Search';
import Profile from '../../screens/common/Profile';
import Content from '../../Components/ContentDrawer';
import Chats from '../../screens/common/Chats';
import Chat from '../../screens/common/Chat';
import { width } from '../../config';
import localization from '../../localization/localization';

const Customer = createDrawerNavigator({
    Home                : Home,
    Auth                : Auth,
    Chats               : Chats,
    Chat                : Chat,
    Aboutus             : Aboutus,
    TermsAndConditions  : TermsAndConditions,
    Notifications       : Notifications,
    Profile             : Profile,
    Favourite           : Favourite,
    Offers              : AllOffers,
    Search              : Search,
},
{
    contentComponent:props => <Content {...props}/>,
    drawerPosition:I18nManager.isRTL?'right':'left',
    drawerWidth:width*0.85,
    overlayColor:0,
}
)


export default (Customer);