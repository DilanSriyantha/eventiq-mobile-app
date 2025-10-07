package com.example.eventiq.ConsumerEvents.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddServiceRequest {

    private int eventId;

    private int serviceId;
}
