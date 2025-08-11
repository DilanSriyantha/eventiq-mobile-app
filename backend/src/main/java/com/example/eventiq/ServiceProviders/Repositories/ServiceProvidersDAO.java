package com.example.eventiq.ServiceProviders.Repositories;

import com.example.eventiq.ServiceProviders.Models.ServiceProvider;
import com.example.eventiq.Utils.DAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Slf4j
@RequiredArgsConstructor
public class ServiceProvidersDAO implements DAO<ServiceProvider> {
    @Override
    public List<ServiceProvider> getAll() {
        return List.of();
    }

    @Override
    public Page<ServiceProvider> getPage(int page, int pageSize) {
        return null;
    }

    @Override
    public Optional<ServiceProvider> get(int id) {
        return Optional.empty();
    }

    @Override
    public void create(ServiceProvider serviceProvider) {

    }

    @Override
    public void update(int id, ServiceProvider serviceProvider) {

    }

    @Override
    public void delete(int id) {

    }
}
