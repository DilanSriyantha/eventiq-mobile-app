package com.example.eventiq.ServiceProviders.Controllers;

import com.example.eventiq.ServiceProviders.Services.ServiceProvidersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api/v1/service-providers")
@RequiredArgsConstructor
public class ServiceProvidersController {
    private final ServiceProvidersService serviceProvidersService;

    @GetMapping("/")
    public @ResponseBody ResponseEntity<String> handleRootRequest() {
        return ResponseEntity.ok("Service Providers Root");
    }
}
