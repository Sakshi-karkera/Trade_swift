import { useUser } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function Index() {
  const { user, isLoaded } = useUser();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState.key) {
      // Handle when the root navigation state is not yet loaded
    }
  }, [rootNavigationState.key]);

  if (!isLoaded) {
    // Show a loading screen if the user state isn't loaded yet
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;
  }

  // Once the user is loaded, redirect based on their status
  return (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href={'/(tabs)/home'} /> : <Redirect href={'/login'} />}
    </View>
  );
}
