package com.example.eventiq.ServiceComments.Controllers;

import com.example.eventiq.ServiceComments.DTOs.CommentCreateRequest;
import com.example.eventiq.ServiceComments.DTOs.CommentUpdateRequest;
import com.example.eventiq.ServiceComments.Models.Comment;
import com.example.eventiq.ServiceComments.Services.ServiceCommentsService;
import com.example.eventiq.Types.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/service-comments")
@RequiredArgsConstructor
public class ServiceCommentsController {
    private final ServiceCommentsService serviceCommentsService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Comment>> getAll(@RequestParam("serviceId") int serviceId) {
        return ResponseEntity.ok(serviceCommentsService.getAll(serviceId));
    }

    @GetMapping("/getPage")
    public ResponseEntity<Page<Comment>> getPage(int serviceId, int page, int pageSize) {
        return ResponseEntity.ok(serviceCommentsService.getPage(serviceId, page, pageSize));
    }

    @PostMapping("/create")
    public ResponseEntity<Comment> create(@RequestBody CommentCreateRequest request) throws Exception {
        var comment = serviceCommentsService.create(request);

        return ResponseEntity.ok(comment);
    }

    @PostMapping("/update")
    public ResponseEntity<SuccessResponse> update(@RequestBody CommentUpdateRequest request) throws Exception {
        serviceCommentsService.update(request);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Comment updated successfully")
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<SuccessResponse> delete(@RequestParam("commentId") int commentId) {
        serviceCommentsService.delete(commentId);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Comment deleted successfully")
                .build();
        return ResponseEntity.ok(response);
    }
}
