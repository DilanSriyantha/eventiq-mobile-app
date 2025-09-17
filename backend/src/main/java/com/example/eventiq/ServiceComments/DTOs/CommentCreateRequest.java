package com.example.eventiq.ServiceComments.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentCreateRequest {

    private String userEmail;

    private int serviceId;

    private String commentBody;
}
