// import { useRouter } from "expo-router";
// import { useCallback } from "react";
// import { StyleSheet, View } from "react-native";
// import { Button, Divider, Surface, Text } from "react-native-paper";

// export default function Login() {
//     const routes = useRouter();

//     const handleContinueWithGooglePress = useCallback(() => {
//         routes.push("/auth/register");
//     }, []);

//     const handleContinueWithEmailPress = useCallback(() => {
//         routes.push("/auth/register");
//     }, []);

//     const handleLoginPress = useCallback(() => {
//         routes.push("/auth/login");
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Surface mode="flat" style={styles.contentContainer}>
//                 <Surface mode="flat" style={styles.headerContainer}>
//                     <Text variant="headlineMedium">Let's get started</Text>
//                 </Surface>
//                 <Surface mode="flat" style={styles.optionsContainer}>
//                     <Button
//                         style={styles.withGoogleButton}
//                         icon={"google"}
//                         mode="contained-tonal"
//                         onPress={handleContinueWithGooglePress}
//                     >
//                         Continue with google
//                     </Button>
//                     <Button
//                         style={styles.withGoogleButton}
//                         icon={"email"}
//                         mode="contained-tonal"
//                         onPress={handleContinueWithEmailPress}
//                     >
//                         Continue with Email
//                     </Button>
//                     <Divider />
//                     <Surface mode="flat" style={styles.subheaderContainer}>
//                         <Text variant="titleMedium">Already have an account?</Text>
//                     </Surface>
//                     <Button
//                         style={styles.withGoogleButton}
//                         icon={"login"}
//                         mode="contained-tonal"
//                         onPress={handleLoginPress}
//                     >
//                         Login
//                     </Button>
//                 </Surface>
//             </Surface>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     contentContainer: {
//         flex: 1,
//         gap: 1,
//         padding: 10,
//         paddingTop: 60,
//     },
//     headerContainer: {
//         flex: .1,
//     },
//     optionsContainer: {
//         flex: 1,
//         gap: 10,
//     },
//     withGoogleButton: {
//         borderRadius: 5,
//     },
//     subheaderContainer: {
//         gap: 1,
//         padding: 5,
//     },
// });

import Login from "./login";
export default Login;