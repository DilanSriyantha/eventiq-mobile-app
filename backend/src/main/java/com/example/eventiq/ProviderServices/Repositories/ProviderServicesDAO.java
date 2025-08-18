package com.example.eventiq.ProviderServices.Repositories;

import com.example.eventiq.ProviderServices.Models.ProviderService;
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
@RequiredArgsConstructor
@Slf4j
public class ProviderServicesDAO implements DAO<ProviderService> {
    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<ProviderService> rowMapper = (rs, rowNum) -> ProviderService.builder()
            .id(rs.getInt("id"))
            .providerId(rs.getInt("providerId"))
            .providerName(rs.getString("providerName"))
            .title(rs.getString("title"))
            .description(rs.getString("description"))
            .imageUrl(rs.getString("imageUrl"))
            .rate(rs.getFloat("rate"))
            .createdAt(rs.getTimestamp("created_at"))
            .updatedAt(rs.getTimestamp("updated_at"))
            .build();

    @Override
    public List<ProviderService> getAll() {
        var sql = "CALL GetAllProviderServices();";

        var providerServices = jdbcTemplate.query(sql, rowMapper);

        return providerServices;
    }

    @Override
    public Page<ProviderService> getPage(int page, int pageSize) {
        var contentSql = "CALL GetProviderServicesPage(?, ?);";

        var offset = page * pageSize;
        var content = jdbcTemplate.query(contentSql, rowMapper, pageSize, offset);

        var countSql = "CALL GetProviderServicesCount();";
        var count = jdbcTemplate.queryForObject(countSql, Integer.class);

        return new PageImpl<>(content, PageRequest.of(page, pageSize), count);
    }

    public Page<ProviderService> getPageByProvider(int providerId, int page, int pageSize) {
        var contentSql = "CALL GetProviderServicesPageByProviderId(?, ?, ?);";

        var offset = page * pageSize;
        var content = jdbcTemplate.query(contentSql, rowMapper, providerId, pageSize, offset);

        var countSql = "CALL GetProviderServicesCountByProviderId(?);";
        var count = jdbcTemplate.queryForObject(countSql, Integer.class, providerId);

        return new PageImpl<>(content, PageRequest.of(page, pageSize), count);
    }

    @Override
    public Optional<ProviderService> get(int id) {
        var sql = "CALL GetProviderService(?);";

        var providerServices = jdbcTemplate.query(sql, rowMapper, id);

        if(providerServices.isEmpty()) return Optional.empty();

        return Optional.of(providerServices.getFirst());
    }

    @Override
    public void create(ProviderService providerService) {
        var sql = "CALL CreateProviderService(?, ?, ?, ?, ?);";

        var rowsAffected = jdbcTemplate.update(sql,
                providerService.getProviderId(),
                providerService.getTitle(),
                providerService.getDescription(),
                providerService.getImageUrl(),
                providerService.getRate()
        );

        log.info("ProviderService created successfully, rowsAffected={}", rowsAffected);
    }

    @Override
    public void update(int id, ProviderService providerService) {
        var sql = "CALL UpdateProviderService(?, ?, ?, ?, ?);";

        var rowsAffected = jdbcTemplate.update(sql,
                providerService.getId(),
                providerService.getTitle(),
                providerService.getDescription(),
                providerService.getImageUrl(),
                providerService.getRate()
        );

        log.info("ProviderService updated successfully, rowsAffected={}", rowsAffected);
    }

    @Override
    public void delete(int id) {
        var sql = "CALL DeleteProviderService(?);";

        var rowsAffected = jdbcTemplate.update(sql, id);

        log.info("ProviderService deleted successfully, rowsAffected={}", rowsAffected);
    }
}
