package com.example.eventiq.NotificationManager.Services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationService notificationService;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        log.info("New websocket connection: {}", sha.getSessionId());

        // broadcast to all connected clients
        new Thread(() -> {
            try { Thread.sleep(1000); } catch (InterruptedException e) {throw new RuntimeException(e);}

            try {
                var notifications = notificationService.getNotificationsForAllUsers();
                notifications.forEach((u, n) -> {
                    try{ Thread.sleep(1000); } catch (InterruptedException e) { throw new RuntimeException(e); };
                    messagingTemplate.convertAndSend("/topic/notifications/" + u, n);
                });
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).start();
    }
}
