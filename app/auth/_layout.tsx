import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="documentos" options={{ title: 'Documentos' }} />
    </Stack>
  );
}