package com.example.eventiq.ConsumerEvents.Controllers;

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
    public @ResponseBody ResponseEntity<List<ConsumerEvent>> getAll(@RequestParam("userId") int userId) {
        return ResponseEntity.ok(consumerEventsService.getAll(userId));
    }

    @GetMapping("/getPage")
    public @ResponseBody ResponseEntity<Page<ConsumerEvent>> getPage(@RequestParam("userId") int userId, @RequestParam("page") int page, @RequestParam("pageSize") int pageSize) {
        return ResponseEntity.ok(consumerEventsService.getPage(userId, page, pageSize));
    }

    @GetMapping("/get")
    public @ResponseBody ResponseEntity<Optional<ConsumerEvent>> get(@RequestParam("eventId") int eventId) {
        return ResponseEntity.ok(consumerEventsService.get(eventId));
    }

    @PostMapping("/create")
    public @ResponseBody ResponseEntity<SuccessResponse> create(@RequestBody ConsumerEvent createRequest) {
        consumerEventsService.create(createRequest);

        var successResponse = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Event created successfully")
                .build();

        return ResponseEntity.ok(successResponse);
    }

    @PostMapping("/update")
    public @ResponseBody ResponseEntity<SuccessResponse> update(@RequestBody ConsumerEvent updateRequest) {
        consumerEventsService.update(updateRequest);

        var successResponse = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Event id=" + updateRequest.getId() + " has been updated successfully.")
                .build();

        return ResponseEntity.ok(successResponse);
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
