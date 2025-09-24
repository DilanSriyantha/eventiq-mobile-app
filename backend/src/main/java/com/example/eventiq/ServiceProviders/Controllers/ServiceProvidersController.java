package com.example.eventiq.ServiceProviders.Controllers;

import com.example.eventiq.ServiceProviders.DTOs.CreateServiceProviderInfoRequest;
import com.example.eventiq.ServiceProviders.DTOs.UpdateServiceProviderInfoRequest;
import com.example.eventiq.ServiceProviders.Models.ServiceProvider;
import com.example.eventiq.ServiceProviders.Services.ServiceProvidersService;
import com.example.eventiq.Types.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/v1/service-providers")
@RequiredArgsConstructor
public class ServiceProvidersController {
    private final ServiceProvidersService serviceProvidersService;

    @GetMapping("/getAll")
    public @ResponseBody ResponseEntity<List<ServiceProvider>> getAll() {
        return ResponseEntity.ok(serviceProvidersService.getAll());
    }

    @GetMapping("/getPage")
    public @ResponseBody ResponseEntity<Page<ServiceProvider>> getPage(@RequestParam("pageSize") int pageSize, @RequestParam("page") int page) {
        return ResponseEntity.ok(serviceProvidersService.getPage(pageSize, page));
    }

    @GetMapping("/getByInfoId")
    public @ResponseBody ResponseEntity<Optional<ServiceProvider>> getByInfoId(@RequestParam("infoId") int infoId) {
        return ResponseEntity.ok(serviceProvidersService.getByInfoId(infoId));
    }

    @GetMapping("/getByProviderId")
    public @ResponseBody ResponseEntity<Optional<ServiceProvider>> getByProviderId(@RequestParam("providerId") int providerId) {
        return ResponseEntity.ok(serviceProvidersService.getByProviderId(providerId));
    }

    @PostMapping("/create")
    public @ResponseBody ResponseEntity<SuccessResponse> create(@RequestBody CreateServiceProviderInfoRequest createRequest) throws Exception {
        serviceProvidersService.create(createRequest);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Service provider created successfully")
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public @ResponseBody ResponseEntity<SuccessResponse> update(@RequestBody UpdateServiceProviderInfoRequest updateRequest) throws Exception {
        serviceProvidersService.update(updateRequest);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Service provider info id=" + updateRequest.getInfoId() + " updated successfully")
                .build();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public @ResponseBody ResponseEntity<SuccessResponse> delete(@RequestParam("infoId") int infoId) {
        serviceProvidersService.delete(infoId);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Service provider info id=" + infoId + " deleted successfully")
                .build();

        return ResponseEntity.ok(response);
    }
}
