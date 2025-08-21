package com.example.eventiq.ProviderPosts.Services;

import com.example.eventiq.ProviderPosts.Models.ProviderPost;
import com.example.eventiq.ProviderPosts.Repositories.ProviderPostsDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProviderPostsService {
    private final ProviderPostsDAO providerPostsDAO;

    public Page<ProviderPost> getPage(int pageSize, int page) {
        return providerPostsDAO.getPage(pageSize, page);
    }

    public Optional<ProviderPost> getOneById(int id) {
        return providerPostsDAO.get(id);
    }

    public Page<ProviderPost> search(String searchKey, int pageSize, int page) {
        return providerPostsDAO.getSearchResultsPage(searchKey, pageSize, page);
    }

    public void create(ProviderPost createRequest) {
        providerPostsDAO.create(createRequest);
    }

    public void update(int id, ProviderPost updateRequest) {
        providerPostsDAO.update(id, updateRequest);
    }

    public void delete(int id) {
        providerPostsDAO.delete(id);
    }
}
