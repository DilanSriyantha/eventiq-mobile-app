package com.example.eventiq.NotificationManager.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    private int id;

    private String title;

    private String message;

    private Timestamp createdAt;
}
