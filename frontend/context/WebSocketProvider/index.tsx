import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { Notification, WebSocketProviderProps, WebSocketProviderType } from "./types";
import { Client } from "@stomp/stompjs";
import * as Notifications from "expo-notifications";
import { useCurrentUser } from "../UserProvider";

const WebSocketContext = createContext<WebSocketProviderType | undefined>(undefined);

const BROKER_URL = Platform.OS === "web"
    ? "ws://127.0.0.1:8080/gs-guide-websocket"
    : "ws://10.0.2.2:8080/gs-guide-websocket";

const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
    const [user] = useCurrentUser();
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (!user) return;

        const stompClient = new Client({
            brokerURL: BROKER_URL,
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
            debug: (str) => {
                console.log(str);
            },
            onConnect: (frame) => {
                console.log("connected to STOMP server ", frame);

                stompClient.subscribe(`/topic/notifications/${user.email}`, (message) => {
                    const data = JSON.parse(message.body);
                    console.log("Received message: ", message.body);

                    data.forEach((notification: any) => {
                        scheduleLocalNotification(notification.title, notification.message);
                    });

                    setNotifications((prev) => [...prev, ...data.map((n: any) => {
                        return { ...n, seen: false };
                    })]);
                });
            },
            onStompError: (error) => {
                console.log(`STOMP error: ${error}`);
            },
            onWebSocketError: (error) => {
                console.log(`WebSocket error: ${error}`);
            },
            onDisconnect: () => {
                console.log("Disconnected from STOMP server");
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        }
    }, []);

    async function scheduleLocalNotification(title: string, body: string) {
        await Notifications.requestPermissionsAsync();

        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
            })
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                sound: "default",
                data: {
                    priority: "high",
                    screen: "/EventCustomization"
                }
            },
            trigger: {
                seconds: 10,
            } as any,
        });
    }

    function getCount() {
        return notifications.length;
    }

    function getUnreadCount() {
        return notifications.filter((n) => !n.seen).length;
    }

    function getReadCount() {
        return notifications.filter((n) => n.seen).length;
    }

    function getAll() {
        return notifications;
    }

    function getOne(id: number) {
        return notifications.find((not) => not.id === id);
    }

    function setSeen(id: number) {
        setNotifications(prev => prev.map((n) => {
            if (n.id === id) return { ...n, seen: true };
            return n;
        }));
    }

    return (
        <WebSocketContext.Provider value={{ getCount, getReadCount, getUnreadCount, getAll, getOne, setSeen }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useNotifications = (): WebSocketProviderType => {
    const ctx = useContext(WebSocketContext);
    if (!ctx) throw new Error("useWebSocket() must be used within <WebSocketProvider>");
    return ctx;
};

export default WebSocketProvider;
