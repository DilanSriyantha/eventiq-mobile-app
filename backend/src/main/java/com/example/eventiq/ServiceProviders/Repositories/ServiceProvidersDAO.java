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

        return jdbcTemplate.query(sql, rowMapper);
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
    public Page<ServiceProvider> getPageById(int id, int page, int pageSize) {
        return null;
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
    public ServiceProvider create(Object... args) throws Exception {
        if(args.length < 4)
            throw new Exception("Expected 4 arguments, received only " + args.length + " arguments");

        var sql = "CALL CreateServiceProvider(?, ?, ?, ?);";
        var serviceProvider = jdbcTemplate.queryForObject(sql, rowMapper, args);

        log.info("Service provider created successfully, with id={}", serviceProvider.getId());

        return serviceProvider;
    }

    @Override
    public ServiceProvider update(int id, Object... args) throws Exception {
        if(args.length < 3)
            throw new Exception("Expected 3 arguments, received only " + args.length + " arguments");

        var sql = "CALL UpdateServiceProvider(?, ?, ?, ?);";

        var params = new Object[args.length + 1];
        params[0] = id;
        System.arraycopy(args, 0, params, 1, args.length);

        var serviceProvider = jdbcTemplate.queryForObject(sql, rowMapper, params);

        log.info("Service provider id={} updated successfully", serviceProvider.getId());

        return serviceProvider;
    }

    @Override
    public void delete(int id) {
        var sql = "CALL DeleteServiceProvider(?);";

        var rowsAffected = jdbcTemplate.update(sql, id);

        log.info("Service provider id={} deleted successfully, rowsAffected={}", id, rowsAffected);
    }
}
