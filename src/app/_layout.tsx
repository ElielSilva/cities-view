import { Stack } from "expo-router";

export default function Layout() {
    

  return(
    <Stack>
      <Stack.Screen name="index" options={{title: "Login"}} />
      <Stack.Screen name="home/index" options={{title: "tela principal"}} />
      <Stack.Screen name="citydetails/[id]" options={{title: "Detalhes da cidade"}} />
    </Stack>
  );
}