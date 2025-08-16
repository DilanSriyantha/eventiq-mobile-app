package com.example.eventiq.ProviderPosts.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateRequest {

    private Integer providerId;

    private String title;

    private String description;

    private String tags;

    private String imageUrl;
}
