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

        return jdbcTemplate.query(sql, rowMapper);
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

    @Override
    public Page<ProviderService> getPageById(int providerId, int page, int pageSize) {
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

    public Integer getCountByProviderId(int id) {
        var sql = "CALL GetProviderServicesCountByProviderId(?)";

        return jdbcTemplate.queryForObject(sql, Integer.class, id);
    }

    @Override
    public ProviderService create(Object... args) throws Exception {
        if(args.length < 5)
            throw new Exception("Expected 5 arguments, received only " + args.length + " arguments");

        var sql = "CALL CreateProviderService(?, ?, ?, ?, ?);";
        var providerService = jdbcTemplate.queryForObject(sql, rowMapper, args);

        log.info("ProviderService created successfully, with id={}", providerService.getId());

        return providerService;
    }

    @Override
    public ProviderService update(int id, Object... args) throws Exception {
        if(args.length < 4)
            throw new Exception("Expected 4 arguments, received only " + args.length + " arguments");

        var sql = "CALL UpdateProviderService(?, ?, ?, ?, ?);";

        var params = new Object[args.length + 1];
        params[0] = id;
        System.arraycopy(args, 0, params, 1, args.length);

        var providerService = jdbcTemplate.queryForObject(sql, rowMapper, params);

        log.info("ProviderService updated successfully");

        return providerService;
    }

    @Override
    public void delete(int id) {
        var sql = "CALL DeleteProviderService(?);";

        var rowsAffected = jdbcTemplate.update(sql, id);

        log.info("ProviderService deleted successfully, rowsAffected={}", rowsAffected);
    }
}
