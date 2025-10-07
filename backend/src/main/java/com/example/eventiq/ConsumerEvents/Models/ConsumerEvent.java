package com.example.eventiq.ConsumerEvents.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsumerEvent {

    private Integer id;

    private Integer userId;

    private String userName;

    private String title;

    private String description;

    private Date date;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
