package com.example.eventiq.ServiceProviders.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateServiceProviderInfoRequest {

    private int id;

    private String title;

    private String welcomeNote;

    private String tags;
}
