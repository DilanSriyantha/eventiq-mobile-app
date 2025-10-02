package com.example.eventiq.ProviderServices.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderServiceUpdateRequest extends ProviderServiceCreateRequest{

    private int serviceId;

    private float rate;
}
