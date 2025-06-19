import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import TanstackQueryProvider from "@/core/providers/tanstack-query.provider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TanstackQueryProvider>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: "Home",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="cart"
              options={{
                title: "Cart",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="checkout"
              options={{
                title: "Checkout",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="product/[id]"
              options={{
                title: "Product Details",
                headerShown: false,
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="dark" />
          <Toast />
        </SafeAreaView>
      </ThemeProvider>
    </TanstackQueryProvider>
  );
}
