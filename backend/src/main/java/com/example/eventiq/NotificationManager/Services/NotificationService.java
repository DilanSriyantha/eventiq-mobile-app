package com.example.eventiq.NotificationManager.Services;

import com.example.eventiq.ConsumerEvents.Services.ConsumerEventsService;
import com.example.eventiq.NotificationManager.Models.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final ConsumerEventsService consumerEventsService;

    public Map<String, List<Notification>> getNotificationsForAllUsers() throws Exception {
        var map = consumerEventsService.getClosingEvents();

        var notificationMap = new HashMap<String, List<Notification>>();
        map.forEach((u, l) -> {
            var notificationList = new ArrayList<Notification>();
            for(var e : l) {
                var id = (int) (new Date().getTime());
                var daysLeft = (e.getDate().getTime() - new Date().getTime()) / 86400000;
                var timestamp = new Timestamp(new Date().getTime());

                var notification = Notification.builder()
                        .id(id)
                        .title(e.getTitle())
                        .message(daysLeft + " more days left.")
                        .createdAt(timestamp)
                        .build();
                notificationList.add(notification);
            }
            notificationMap.put(u, notificationList);
        });

        return notificationMap;
    }

    public List<Notification> getNotifications(String email) throws Exception {
        var closingEvents = consumerEventsService.getClosingEvents(email);

        List<Notification> notifications = new ArrayList<>();
        for(var event : closingEvents) {
            var id = (int)new Date().getTime();
            var daysLeft = (event.getDate().getTime() - new Date().getTime()) / 86400000;
            var timestamp = new Timestamp(new Date().getTime());

            var notification = Notification.builder()
                    .id(id)
                    .title(event.getTitle())
                    .message(daysLeft + " more days left.")
                    .createdAt(timestamp)
                    .build();
            notifications.add(notification);
        }

        return notifications;
    }
}
