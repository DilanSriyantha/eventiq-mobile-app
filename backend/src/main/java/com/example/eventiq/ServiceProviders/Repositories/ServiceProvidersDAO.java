package com.example.eventiq.ServiceProviders.Repositories;

import com.example.eventiq.ServiceProviders.Models.ServiceProvider;
import com.example.eventiq.Utils.DAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Slf4j
@RequiredArgsConstructor
public class ServiceProvidersDAO implements DAO<ServiceProvider> {
    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<ServiceProvider> rowMapper = (rs, rowNum) -> ServiceProvider.builder()
            .id(rs.getInt("providerId"))
            .name(rs.getString("providerName"))
            .infoId(rs.getInt("id"))
            .title(rs.getString("title"))
            .welcomeNote(rs.getString("welcome_note"))
            .rating(rs.getFloat("rating"))
            .tags(rs.getString("tags"))
            .createdAt(rs.getTimestamp("created_at"))
            .updatedAt(rs.getTimestamp("updated_at"))
            .build();

    @Override
    public List<ServiceProvider> getAll() {
        var sql = "CALL GetAllServiceProviders();";

        var serviceProviders = jdbcTemplate.query(sql, rowMapper);

        return serviceProviders;
    }

    @Override
    public Page<ServiceProvider> getPage(int page, int pageSize) {
        var contentSql = "CALL GetServiceProvidersPage(?, ?);";

        var offset = page * pageSize;
        var content = jdbcTemplate.query(contentSql, rowMapper, pageSize, offset);

        var countSql = "CALL GetServiceProvidersCount();";
        var count = jdbcTemplate.queryForObject(countSql, Integer.class);

        return new PageImpl<>(content, PageRequest.of(page, pageSize), count);
    }

    @Override
    public Optional<ServiceProvider> get(int infoId) {
        var sql = "CALL GetServiceProviderByInfoId(?);";

        var serviceProvider = jdbcTemplate.query(sql, rowMapper, infoId);

        if(serviceProvider.isEmpty()) return Optional.empty();

        return Optional.of(serviceProvider.getFirst());
    }

    public Optional<ServiceProvider> getByProviderId(int providerId) {
        var sql = "CALL GetServiceProviderByProviderId(?);";

        var serviceProvider = jdbcTemplate.query(sql, rowMapper, providerId);

        if(serviceProvider.isEmpty()) return Optional.empty();

        return Optional.of(serviceProvider.getFirst());
    }

    @Override
    public void create(ServiceProvider serviceProvider) {
        var sql = "CALL CreateServiceProvider(?, ?, ?, ?);";

        var rowsAffected = jdbcTemplate.update(sql,
                serviceProvider.getId(),
                serviceProvider.getTitle(),
                serviceProvider.getWelcomeNote(),
                serviceProvider.getTags()
        );

        log.info("Service provider created successfully, rowsAffected={}", rowsAffected);
    }

    @Override
    public void update(int id, ServiceProvider serviceProvider) {
        var sql = "CALL UpdateServiceProvider(?, ?, ?, ?);";

        var rowsAffected = jdbcTemplate.update(sql,
                id,
                serviceProvider.getTitle(),
                serviceProvider.getWelcomeNote(),
                serviceProvider.getTags()
        );

        log.info("Service provider id={} updated successfully, rowsAffected={}", id, rowsAffected);
    }

    @Override
    public void delete(int id) {
        var sql = "CALL DeleteServiceProvider(?);";

        var rowsAffected = jdbcTemplate.update(sql, id);

        log.info("Service provider id={} deleted successfully, rowsAffected={}", id, rowsAffected);
    }
}
