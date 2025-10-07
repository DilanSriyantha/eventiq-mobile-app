package com.example.eventiq.ServiceComments.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    private int id;

    private int userId;

    private int serviceId;

    private String username;

    private String serviceTitle;

    private String body;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
