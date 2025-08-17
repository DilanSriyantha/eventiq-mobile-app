package com.example.eventiq.ProviderPosts.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProviderPost {

    private Integer id;

    private Integer providerId;

    private String providerName;

    private String title;

    private String description;

    private String tags;

    private String imageUrl;

    private Float rate;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
