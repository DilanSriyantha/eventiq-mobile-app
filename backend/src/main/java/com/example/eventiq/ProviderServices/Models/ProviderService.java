package com.example.eventiq.ProviderServices.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProviderService {

    private Integer id;

    private Integer providerId;

    private String providerName;

    private String title;

    private String description;

    private String imageUrl;

    private Float rate;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
