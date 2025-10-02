package com.example.eventiq.ProviderPosts.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostCreateRequest {
    private String providerEmail;

    private String title;

    private String description;

    private String tags;

    private String imageUrl;
}
