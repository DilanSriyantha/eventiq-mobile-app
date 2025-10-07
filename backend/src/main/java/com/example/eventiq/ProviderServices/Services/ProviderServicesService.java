package com.example.eventiq.ProviderServices.Services;

import com.example.eventiq.Authentication.Repositories.UserDAO;
import com.example.eventiq.ProviderServices.DTOs.ProviderServiceCreateRequest;
import com.example.eventiq.ProviderServices.DTOs.ProviderServiceUpdateRequest;
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
    private final UserDAO userDAO;

    public List<ProviderService> getAll() {
        return providerServicesDAO.getAll();
    }

    public Page<ProviderService> getPage(int pageSize, int page) {
        return providerServicesDAO.getPage(page, pageSize);
    }

    public Page<ProviderService> getPageByProvider(int providerId, int pageSize, int page) {
        return providerServicesDAO.getPageById(providerId, page, pageSize);
    }

    public Page<ProviderService> getPageByProviderEmail(String providerEmail, int pageSize, int page) throws Exception {
        var user = userDAO.getByEmail(providerEmail)
                .orElseThrow(() -> new Exception("provider not found"));

        return providerServicesDAO.getPageById(user.getId(), page, pageSize);
    }

    public Optional<ProviderService> get(int id) {
        return providerServicesDAO.get(id);
    }

    public Integer getCountByProvider(String providerEmail) throws Exception {
        var user = userDAO.getByEmail(providerEmail)
                .orElseThrow(() -> new Exception("provider not found"));

        return providerServicesDAO.getCountByProviderId(user.getId());
    }

    public void create(ProviderServiceCreateRequest createRequest) throws Exception {
        var user = userDAO.getByEmail(createRequest.getProviderEmail())
                        .orElseThrow(() -> new Exception("provider not found"));

        providerServicesDAO.create(
                user.getId(),
                createRequest.getTitle(),
                createRequest.getDescription(),
                createRequest.getImageUrl(),
                0.0f
        );
    }

    public void update(ProviderServiceUpdateRequest updateRequest) throws Exception {
        providerServicesDAO.update(
                updateRequest.getServiceId(),
                updateRequest.getTitle(),
                updateRequest.getDescription(),
                updateRequest.getImageUrl(),
                updateRequest.getRate()
        );
    }

    public void delete(int id) {
        providerServicesDAO.delete(id);
    }
}
