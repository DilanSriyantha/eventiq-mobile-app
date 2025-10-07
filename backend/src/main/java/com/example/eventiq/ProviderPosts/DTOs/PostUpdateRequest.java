package com.example.eventiq.ProviderPosts.DTOs;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostUpdateRequest extends PostCreateRequest{
    private int postId;

    private float rate;
}
