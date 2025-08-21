package com.example.eventiq.ServiceProviders.Services;

import com.example.eventiq.ServiceProviders.Models.ServiceProvider;
import com.example.eventiq.ServiceProviders.Repositories.ServiceProvidersDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServiceProvidersService {
    private final ServiceProvidersDAO serviceProvidersDAO;

    public List<ServiceProvider> getAll() {
        return serviceProvidersDAO.getAll();
    }

    public Page<ServiceProvider> getPage(int pageSize, int page) {
        return serviceProvidersDAO.getPage(page, pageSize);
    }

    public Optional<ServiceProvider> getByInfoId(int infoId) {
        return serviceProvidersDAO.get(infoId);
    }

    public Optional<ServiceProvider> getByProviderId(int providerId) {
        return serviceProvidersDAO.getByProviderId(providerId);
    }

    public void create(ServiceProvider createRequest) {
        serviceProvidersDAO.create(createRequest);
    }

    public void update(ServiceProvider updateRequest) {
        serviceProvidersDAO.update(updateRequest.getInfoId(), updateRequest);
    }

    public void delete(int id) {
        serviceProvidersDAO.delete(id);
    }
}
