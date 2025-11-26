package com.example.eventiq.NotificationManager.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class NotificationController {

    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/broadcast")
    public void broadcastMessage(@RequestBody String message) {
        messagingTemplate.convertAndSend("/topic/notifications", message);
    }
}
