import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, Octicons } from "react-native-vector-icons";
import HomeScreen from '../screens/Home';
import Notification from '../screens/Notification';
import Post from '../screens/Post';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: 'black', borderTopWidth: 0.3 }, tabBarShowLabel: false, tabBarActiveTintColor: 'white' }}
            initialRouteName='Home'
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ focused, color }) => {
                    if (focused) {
                        return <Octicons name="home" size={24} color={'skyblue'} />
                    }
                    return <Octicons name="home" size={24} color={color} />
                },
            }} />
            <Tab.Screen name="Search" component={HomeScreen} options={{
                tabBarIcon: ({ focused, color }) => {
                    if (focused) {
                        return <Octicons name="search" size={24} color={'skyblue'} />
                    }
                    return <Octicons name="search" size={24} color={color} />
                },
            }} />
            <Tab.Screen name="Post" component={Post}
                options={{
                    tabBarStyle: { display: 'none' },
                    tabBarIcon: ({ focused, color }) => {
                        if (focused) {
                            return <Ionicons name="add-circle-outline" size={28} color={'skyblue'} />
                        }
                        return <Ionicons name="add-circle-outline" size={28} color={color} />
                    }
                }} />
            <Tab.Screen name="Notification" component={Notification} options={{
                tabBarIcon: ({ focused, color }) => {
                    if (focused) {
                        return <Ionicons name="notifications-outline" size={24} color={'skyblue'} />
                    }
                    return <Ionicons name="notifications-outline" size={24} color={color} />
                }
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarStyle: { display: 'none' },
                tabBarIcon: ({ focused, color }) => {
                    if (focused) {
                        return <AntDesign name="user" size={24} color={'skyblue'} />
                    }
                    return <AntDesign name="user" size={24} color={color} />
                }
            }} />

        </Tab.Navigator>
    );
}

export default Tabs