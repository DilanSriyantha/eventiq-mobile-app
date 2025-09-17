package com.example.eventiq.EventServices.Repositories;

import com.example.eventiq.EventServices.Models.EventService;
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
public class EventServicesDAO implements DAO<EventService> {
    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<EventService> rowMapper = (rs, rowNum) -> EventService.builder()
            .eventId(rs.getInt("event_id"))
            .serviceId(rs.getInt("service_id"))
            .eventTitle(rs.getString("event_title"))
            .eventDescription(rs.getString("event_description"))
            .eventDate(rs.getString("event_date"))
            .title(rs.getString("service_title"))
            .description(rs.getString("service_description"))
            .imageUrl(rs.getString("service_img"))
            .rate(rs.getFloat("service_rate"))
            .build();

    public List<EventService> getAll(int eventId) {
        var sql = "CALL GetAllEventServices(?)";

        return jdbcTemplate.query(sql, rowMapper, eventId);
    }

    public Page<EventService> getPage(int eventId, int page, int pageSize) {
        var contentSql = "CALL GetEventServicesPage(?,?,?)";
        var offset = page * pageSize;
        var content = jdbcTemplate.query(contentSql, rowMapper, eventId, pageSize, offset);

        var countSql = "CALL GetEventServicesCount(?)";
        var count = jdbcTemplate.queryForObject(countSql, Integer.class, eventId);

        return new PageImpl<>(content, PageRequest.of(page, pageSize), count);
    }

    public boolean addServiceToEvent(int eventId, int serviceId) {
        var sql = "CALL AddServiceToEvent(?, ?)";

        var rowsAffected = jdbcTemplate.update(sql, eventId, serviceId);

        return rowsAffected > 0;
    }

    public boolean removeServiceFromEvent(int eventId, int serviceId) {
        var sql = "CALL RemoveServiceFromEvent(?, ?)";

        var rowsAffected = jdbcTemplate.update(sql, eventId, serviceId);

        return rowsAffected > 0;
    }

    @Override
    public List<EventService> getAll() {
        return null;
    }

    @Override
    public Page<EventService> getPage(int page, int pageSize) {
        return null;
    }

    @Override
    public Optional<EventService> get(int id) {
        return Optional.empty();
    }

    @Override
    public void create(EventService request) {

    }

    @Override
    public void update(int id, EventService request) {

    }

    @Override
    public void delete(int id) {

    }
}
