package com.example.eventiq.ServiceProviders.DTOs;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateServiceProviderInfoRequest {

    private int infoId;

    private String title;

    private String welcomeNote;

    private String contactNumber;

    private String address;

    private String businessEmail;

    private String tags;
}
