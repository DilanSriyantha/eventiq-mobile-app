package com.example.eventiq.ProviderServices.Controllers;

import com.example.eventiq.ProviderServices.Models.ProviderService;
import com.example.eventiq.ProviderServices.Services.ProviderServicesService;
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
@RequestMapping("/api/v1/provider-services")
@RequiredArgsConstructor
public class ProviderServicesController {
    private final ProviderServicesService providerServicesService;

    @GetMapping("/getAll")
    public @ResponseBody ResponseEntity<List<ProviderService>> getAll() {
        return ResponseEntity.ok(providerServicesService.getAll());
    }

    @GetMapping("/getPage")
    public @ResponseBody ResponseEntity<Page<ProviderService>> getPage(@RequestParam("pageSize") int pageSize, @RequestParam("page") int page) {
        return ResponseEntity.ok(providerServicesService.getPage(pageSize, page));
    }

    @GetMapping("/getPageByProvider")
    public @ResponseBody ResponseEntity<Page<ProviderService>> getPageByProvider(@RequestParam("providerId") int providerId, @RequestParam("pageSize") int pageSize, @RequestParam("page") int page) {
        return ResponseEntity.ok(providerServicesService.getPageByProvider(providerId, pageSize, page));
    }

    @GetMapping("/get")
    public @ResponseBody ResponseEntity<Optional<ProviderService>> get(@RequestParam("id") int id) {
        return ResponseEntity.ok(providerServicesService.get(id));
    }

    @PostMapping("/create")
    public @ResponseBody ResponseEntity<SuccessResponse> create(@RequestBody ProviderService createRequest) throws Exception {
        providerServicesService.create(createRequest);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("ProviderService created successfully")
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public @ResponseBody ResponseEntity<SuccessResponse> update(@RequestBody ProviderService updateRequest) throws Exception {
        providerServicesService.update(updateRequest);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("ProviderService updated successfully")
                .build();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public @ResponseBody ResponseEntity<SuccessResponse> delete(@RequestParam("id") int id) {
        providerServicesService.delete(id);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("ProviderResponse id=" + id + " has been deleted successfully")
                .build();

        return ResponseEntity.ok(response);
    }
}
