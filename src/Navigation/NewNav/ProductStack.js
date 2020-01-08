import { createStackNavigator } from 'react-navigation';

import Products from '../../screens/vendor/Products';
import Product from '../../screens/customer/Product';

const ProductStack = createStackNavigator({
    Products    : Products,
    Product     : Product,
},
{
    headerMode: 'none',
});

export default ProductStack;