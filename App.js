import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import LessonScreen from './screens/LessonScreen';
import QuizScreen from './screens/QuizScreen';
import GameScreen from './screens/GameScreen';
import ProgressScreen from './screens/ProgressScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import ForumScreen from './screens/ForumScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
    return ( <
        Stack.Navigator >
        <
        Stack.Screen name = "Login"
        component = { LoginScreen }
        /> <
        Stack.Screen name = "Register"
        component = { RegisterScreen }
        /> < /
        Stack.Navigator >
    );
}

function MainTabs() {
    return ( <
        Tab.Navigator screenOptions = {
            ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Lessons') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Game') {
                        iconName = focused ? 'game-controller' : 'game-controller-outline';

                    } else if (route.name === 'Game') {
                        iconName = focused ? 'game-controller' : 'game-controller-outline';
                    } else if (route.name === 'Progress') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    } else if (route.name === 'Forum') {
                        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                    }

                    return <Ionicons name = { iconName }
                    size = { size }
                    color = { color }
                    />;
                },
            })
        } >
        <
        Tab.Screen name = "Home"
        component = { HomeScreen }
        /> <
        Tab.Screen name = "Lessons"
        component = { LessonScreen }
        /> <
        Tab.Screen name = "Game"
        component = { GameScreen }
        /> <
        Tab.Screen name = "Progress"
        component = { ProgressScreen }
        /> <
        Tab.Screen name = "Forum"
        component = { ForumScreen }
        /> < /
        Tab.Navigator >
    );
}

function MainStack() {
    return ( <
        Stack.Navigator >
        <
        Stack.Screen name = "MainTabs"
        component = { MainTabs }
        options = {
            { headerShown: false }
        }
        /> <
        Stack.Screen name = "Quiz"
        component = { QuizScreen }
        /> <
        Stack.Screen name = "Achievements"
        component = { AchievementsScreen }
        /> < /
        Stack.Navigator >
    );
}

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    return ( <
        NavigationContainer > { user ? < MainStack / > : < AuthStack / > } <
        /NavigationContainer>
    );
}