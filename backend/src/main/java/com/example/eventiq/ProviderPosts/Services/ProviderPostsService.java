package com.example.eventiq.ProviderPosts.Services;

import com.example.eventiq.Authentication.Repositories.UserDAO;
import com.example.eventiq.ProviderPosts.DTOs.PostCreateRequest;
import com.example.eventiq.ProviderPosts.DTOs.PostUpdateRequest;
import com.example.eventiq.ProviderPosts.Models.ProviderPost;
import com.example.eventiq.ProviderPosts.Repositories.ProviderPostsDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProviderPostsService {
    private final UserDAO userDAO;
    private final ProviderPostsDAO providerPostsDAO;

    public Page<ProviderPost> getPage(int pageSize, int page) {
        return providerPostsDAO.getPage(pageSize, page);
    }

    public Page<ProviderPost> getPageByProviderEmail(int pageSize, int page, String providerEmail) throws Exception {
        var user = userDAO.getByEmail(providerEmail)
                .orElseThrow(() -> new Exception("Provider not found"));

        return providerPostsDAO.getPageByProviderId(user.getId(), pageSize, page);
    }

    public Optional<ProviderPost> getOneById(int id) {
        return providerPostsDAO.get(id);
    }

    public Integer getCountByProvider(String email) throws Exception {
        var user = userDAO.getByEmail(email)
                .orElseThrow(() -> new Exception("Provider not found"));

        return providerPostsDAO.getCountByProvider(user.getId());
    }

    public Page<ProviderPost> search(String searchKey, int pageSize, int page) {
        return providerPostsDAO.getSearchResultsPage(searchKey, pageSize, page);
    }

    public void create(PostCreateRequest createRequest) throws Exception {
        var provider = userDAO.getByEmail(createRequest.getProviderEmail())
                        .orElseThrow(() -> new Exception("Provider not found"));

        providerPostsDAO.create(
                provider.getId(),
                createRequest.getTitle(),
                createRequest.getDescription(),
                createRequest.getTags(),
                createRequest.getImageUrl()
        );
    }

    public void update(PostUpdateRequest updateRequest) throws Exception {
        providerPostsDAO.update(
                updateRequest.getPostId(),
                updateRequest.getTitle(),
                updateRequest.getDescription(),
                updateRequest.getTags(),
                updateRequest.getImageUrl(),
                updateRequest.getRate()
        );
    }

    public void delete(int id) {
        providerPostsDAO.delete(id);
    }
}
