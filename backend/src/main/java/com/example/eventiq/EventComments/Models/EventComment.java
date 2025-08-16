package com.example.eventiq.EventComments.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventComment {

    private Integer id;

    private Integer eventId;

    private Integer userId;

    private String userName;

    private String comment;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
