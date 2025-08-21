package com.example.eventiq.ServiceProviders.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceProvider {

    private Integer id;

    private Integer infoId;

    private String name;

    private String title;

    private String welcomeNote;

    private String tags;

    private Float rating;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
