package com.example.eventiq.EventServices.Controllers;

import com.example.eventiq.ConsumerEvents.DTOs.AddServiceRequest;
import com.example.eventiq.ConsumerEvents.DTOs.RemoveServiceRequest;
import com.example.eventiq.EventServices.Models.EventService;
import com.example.eventiq.EventServices.Services.EventServicesService;
import com.example.eventiq.Types.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/event-services")
@RequiredArgsConstructor
public class EventServicesController {
    private final EventServicesService eventServicesService;

    @GetMapping("/getAll")
    public ResponseEntity<List<EventService>> getAll(
            @RequestParam("eventId") int eventId
    ) {
        return ResponseEntity.ok(eventServicesService.getAll(eventId));
    }

    @GetMapping("/getPage")
    public ResponseEntity<Page<EventService>> getPage(
            @RequestParam("eventId") int eventId,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize
    ) {
        return ResponseEntity.ok(eventServicesService.getPage(eventId, page, pageSize));
    }

    @PostMapping("/addServiceToEvent")
    public ResponseEntity<SuccessResponse> addServiceToEvent(
            @RequestBody AddServiceRequest request
    ) {
        eventServicesService.addServiceToEvent(request);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Service added to the event successfully")
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/removeServiceFromEvent")
    public ResponseEntity<SuccessResponse> removeServiceFromEvent(
            @RequestBody RemoveServiceRequest request
    ) {
        eventServicesService.removeServiceFromEvent(request);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Service removed from the event successfully")
                .build();

        return ResponseEntity.ok(response);
    }
}
