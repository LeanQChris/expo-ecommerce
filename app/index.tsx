import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme } from "@react-navigation/native";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import ExploreScreen from "./explore";
import HomeScreen from "./home";
import ProfileScreen from "./profile";

const Tab = createBottomTabNavigator();

export default function LandingScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: DefaultTheme.colors.background,
        },
        tabBarButton: (props) => (
          <TouchableWithoutFeedback onPress={props.onPress}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 0,
              }}
            >
              {props.children}
            </View>
          </TouchableWithoutFeedback>
        ),
        tabBarIcon: ({ focused, size, color }) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"];

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "apps" : "apps-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else {
            iconName = "add";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#ccccc",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
