import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";

const NotificationListener = () => {
    const notificationListener = useRef<any>(null);
    const responseListener = useRef<any>(null);
    const router = useRouter();

    useEffect(() => {
        // listener for when a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log("Notification received: ", notification);
        });

        // listener for when a user taps on a notification
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("Notication tapped: ", response);

            const { data } = response.notification.request.content;

            if (data && data.screen) {
                router.push(data.screen as any);
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
};

export default NotificationListener;