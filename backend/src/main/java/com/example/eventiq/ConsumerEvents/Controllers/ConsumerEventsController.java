package com.example.eventiq.ConsumerEvents.Controllers;

import com.example.eventiq.ConsumerEvents.DTOs.CreateEventRequest;
import com.example.eventiq.ConsumerEvents.DTOs.UpdateEventRequest;
import com.example.eventiq.ConsumerEvents.Models.ConsumerEvent;
import com.example.eventiq.ConsumerEvents.Services.ConsumerEventsService;
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
@RequestMapping("/api/v1/consumer-events")
@RequiredArgsConstructor
public class ConsumerEventsController {
    private final ConsumerEventsService consumerEventsService;

    @GetMapping("/getAll")
    public @ResponseBody ResponseEntity<List<ConsumerEvent>> getAll(@RequestParam("userEmail") String userEmail) throws Exception {
        return ResponseEntity.ok(consumerEventsService.getAllByUser(userEmail));
    }

    @GetMapping("/getPage")
    public @ResponseBody ResponseEntity<Page<ConsumerEvent>> getPage(@RequestParam("userEmail") String userEmail, @RequestParam("page") int page, @RequestParam("pageSize") int pageSize) throws Exception {
        return ResponseEntity.ok(consumerEventsService.getPage(userEmail, page, pageSize));
    }

    @GetMapping("/get")
    public @ResponseBody ResponseEntity<Optional<ConsumerEvent>> get(@RequestParam("eventId") int eventId) {
        return ResponseEntity.ok(consumerEventsService.get(eventId));
    }

    @PostMapping("/create")
    public @ResponseBody ResponseEntity<ConsumerEvent> create(@RequestBody CreateEventRequest request) throws Exception {
        var event = consumerEventsService.create(request);

        return ResponseEntity.ok(event);
    }

    @PostMapping("/update")
    public @ResponseBody ResponseEntity<ConsumerEvent> update(@RequestBody UpdateEventRequest request) throws Exception {
        var event = consumerEventsService.update(request);

        return ResponseEntity.ok(event);
    }

    @DeleteMapping("/delete")
    public @ResponseBody ResponseEntity<SuccessResponse> delete(@RequestParam("eventId") int eventId) {
        consumerEventsService.delete(eventId);

        var successResponse = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Event id=" + eventId + " has been deleted successfully.")
                .build();

        return ResponseEntity.ok(successResponse);
    }
}
