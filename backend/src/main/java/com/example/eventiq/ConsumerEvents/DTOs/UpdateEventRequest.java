package com.example.eventiq.ConsumerEvents.DTOs;

import lombok.*;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateEventRequest {
    private int id;

    private String title;

    private String description;

    private Date date;
}
