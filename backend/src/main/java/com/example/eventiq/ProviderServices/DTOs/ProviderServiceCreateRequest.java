package com.example.eventiq.ProviderServices.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProviderServiceCreateRequest {

    private String providerEmail;

    private String title;

    private String description;

    private String imageUrl;
}
