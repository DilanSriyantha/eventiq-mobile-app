package com.example.eventiq.ProviderServices.Services;

import com.example.eventiq.ProviderServices.Models.ProviderService;
import com.example.eventiq.ProviderServices.Repositories.ProviderServicesDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProviderServicesService {
    private final ProviderServicesDAO providerServicesDAO;

    public List<ProviderService> getAll() {
        return providerServicesDAO.getAll();
    }

    public Page<ProviderService> getPage(int pageSize, int page) {
        return providerServicesDAO.getPage(page, pageSize);
    }

    public Page<ProviderService> getPageByProvider(int providerId, int pageSize, int page) {
        return providerServicesDAO.getPageByProvider(providerId, page, pageSize);
    }

    public Optional<ProviderService> get(int id) {
        return providerServicesDAO.get(id);
    }

    public void create(ProviderService createRequest) {
        providerServicesDAO.create(createRequest);
    }

    public void update(ProviderService updateRequest) {
        providerServicesDAO.update(updateRequest.getId(), updateRequest);
    }

    public void delete(int id) {
        providerServicesDAO.delete(id);
    }
}
