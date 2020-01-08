import { createStackNavigator } from 'react-navigation';

import Chats from '../../screens/common/Chats';
import Chat from '../../screens/common/Chat';

const ChatStack = createStackNavigator({
    Chats    : Chats,
    OneChat     : Chat,
},
{
    headerMode: 'none',
});

export default ChatStack;