package com.example.eventiq.ServiceProviders.Services;

import com.example.eventiq.ServiceProviders.DTOs.CreateServiceProviderInfoRequest;
import com.example.eventiq.ServiceProviders.DTOs.UpdateServiceProviderInfoRequest;
import com.example.eventiq.ServiceProviders.Models.ServiceProvider;
import com.example.eventiq.ServiceProviders.Repositories.ServiceProvidersDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

    public ServiceProvider create(CreateServiceProviderInfoRequest request) throws Exception {
        return serviceProvidersDAO.create(
                request.getId(),
                request.getTitle(),
                request.getWelcomeNote(),
                request.getTags()
        );
    }

    public ServiceProvider update(UpdateServiceProviderInfoRequest request) throws Exception {
        return serviceProvidersDAO.update(
                request.getInfoId(),
                request.getTitle(),
                request.getWelcomeNote(),
                request.getTitle()
        );
    }

    public void delete(int id) {
        serviceProvidersDAO.delete(id);
    }
}
