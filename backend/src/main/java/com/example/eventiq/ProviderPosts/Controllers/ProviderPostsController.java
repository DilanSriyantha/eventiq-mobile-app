package com.example.eventiq.ProviderPosts.Controllers;
import com.example.eventiq.ProviderPosts.Models.ProviderPost;
import com.example.eventiq.ProviderPosts.Services.ProviderPostsService;
import com.example.eventiq.Types.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/api/v1/provider-posts")
@RequiredArgsConstructor
public class ProviderPostsController {
    private final ProviderPostsService providerPostsService;

    @GetMapping("/getPage")
    public @ResponseBody ResponseEntity<Page<ProviderPost>> getPage(@RequestParam("pageSize") int pageSize, @RequestParam("page") int page) {
        return ResponseEntity.ok(providerPostsService.getPage(pageSize, page));
    }

    @GetMapping("/get")
    public @ResponseBody ResponseEntity<Optional<ProviderPost>> getOneById(@RequestParam("id") int id) {
        return ResponseEntity.ok(providerPostsService.getOneById(id));
    }

    @GetMapping("/search")
    public @ResponseBody ResponseEntity<Page<ProviderPost>> search(@RequestParam("searchKey") String searchKey, @RequestParam("pageSize") int pageSize, @RequestParam("page") int page) {
        return ResponseEntity.ok(providerPostsService.search(searchKey, pageSize, page));
    }

    @PostMapping("/create")
    public @ResponseBody ResponseEntity<SuccessResponse> create(@RequestBody ProviderPost createRequest) {
        providerPostsService.create(createRequest);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Post created successfully.")
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public @ResponseBody ResponseEntity<SuccessResponse> update(@RequestBody ProviderPost updateRequest) {
        providerPostsService.update(updateRequest.getId(), updateRequest);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Post has been updated successfully.")
                .build();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public @ResponseBody ResponseEntity<SuccessResponse> delete(@RequestParam("id") int id) {
        providerPostsService.delete(id);

        var response = SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Post has been deleted successfully.")
                .build();

        return ResponseEntity.ok(response);
    }
}
