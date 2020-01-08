import { createStackNavigator } from 'react-navigation';

import Home from '../../screens/customer/Home';
import Category from '../../screens/customer/Category';
import Categories from '../../screens/customer/Categories';
import AllOffers from '../../screens/customer/AllOffers';
import Product from '../../screens/customer/Product';

const HomeCustomer = createStackNavigator({
    Home        : Home,
    Categories  : Categories,
    Category    : Category,
    AllOffers   : AllOffers,
    Product     : Product,
},
{
    headerMode: 'none',
});

export default HomeCustomer;