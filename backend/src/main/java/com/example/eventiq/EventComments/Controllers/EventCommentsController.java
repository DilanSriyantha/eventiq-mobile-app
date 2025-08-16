package com.example.eventiq.EventComments.Controllers;

import com.example.eventiq.EventComments.Models.EventComment;
import com.example.eventiq.EventComments.Services.EventCommentsService;
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
@RequestMapping("/api/v1/event-comments")
@RequiredArgsConstructor
public class EventCommentsController {
    private final EventCommentsService eventCommentsService;

    @GetMapping("/getAll")
    public @ResponseBody ResponseEntity<List<EventComment>> getAll() {
        return ResponseEntity.ok(eventCommentsService.getAll());
    }

    @GetMapping("/getPage")
    public @ResponseBody ResponseEntity<Page<EventComment>> getPage(@RequestParam("eventId") int eventId, @RequestParam("page") int page, @RequestParam("pageSize") int pageSize) {
        return ResponseEntity.ok(eventCommentsService.getPage(eventId, page, pageSize));
    }

    @GetMapping("/get")
    public @ResponseBody ResponseEntity<Optional<EventComment>> get(@RequestParam("commentId") int commentId) {
        return ResponseEntity.ok(eventCommentsService.get(commentId));
    }

    @PostMapping("/create")
    public @ResponseBody ResponseEntity<SuccessResponse> create(@RequestBody EventComment createRequest) {
        eventCommentsService.create(createRequest);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Comment created successfully")
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public @ResponseBody ResponseEntity<SuccessResponse> update(@RequestBody EventComment updateRequest) {
        eventCommentsService.update(updateRequest);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Comment created successfully")
                .build();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public @ResponseBody ResponseEntity<SuccessResponse> delete(@RequestParam("id") int id) {
        eventCommentsService.delete(id);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Comment id=" + id + " has been deleted successfully")
                .build();

        return ResponseEntity.ok(response);
    }
}
