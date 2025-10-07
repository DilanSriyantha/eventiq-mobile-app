package com.example.eventiq.EventServices.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventService {
    private int eventId;

    private int serviceId;

    private String eventTitle;

    private String eventDescription;

    private String eventDate;

    private String title;

    private String description;

    private String imageUrl;

    private Float rate;
}
