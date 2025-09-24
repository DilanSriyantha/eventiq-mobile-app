package com.example.eventiq.ConsumerEvents.Repositories;

import  com.example.eventiq.ConsumerEvents.Models.ConsumerEvent;
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
public class ConsumerEventsDAO implements DAO<ConsumerEvent> {
    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<ConsumerEvent> rowMapper = (rs, rowNum) -> ConsumerEvent.builder()
            .id(rs.getInt("id"))
            .userId(rs.getInt("userId"))
            .userName(rs.getString("userName"))
            .title(rs.getString("title"))
            .description(rs.getString("description"))
            .date(rs.getDate("date"))
            .createdAt(rs.getTimestamp("created_at"))
            .updatedAt(rs.getTimestamp("updated_at"))
            .build();

    @Override
    public List<ConsumerEvent> getAll() {
        return null;
    }

    public List<ConsumerEvent> getAllById(int userId) {
        var sql = "CALL GetConsumerEvents(?);";

        return jdbcTemplate.query(sql, rowMapper, userId);
    }

    @Override
    public Page<ConsumerEvent> getPage(int page, int pageSize) {
        return null;
    }

    @Override
    public Page<ConsumerEvent> getPageById(int userId, int page, int pageSize) {
        var contentSql = "CALL GetConsumerEventsPage(?, ?, ?);";

        var offset = page * pageSize;
        var content = jdbcTemplate.query(contentSql, rowMapper, userId, pageSize, offset);

        var countSql = "CALL GetConsumerEventsCount(?);";
        var count = jdbcTemplate.queryForObject(countSql, Integer.class, userId);

        return new PageImpl<>(content, PageRequest.of(page, pageSize), count);
    }

    @Override
    public Optional<ConsumerEvent> get(int id) {
        var sql = "CALL GetConsumerEvent(?);";
        var consumerEvent = jdbcTemplate.query(sql, rowMapper, id);

        if(consumerEvent.isEmpty()) return Optional.empty();

        return Optional.of(consumerEvent.getFirst());
    }

    @Override
    public Object create(Object... args) throws Exception {
        if(args.length < 4)
            throw new Exception("Expected 4 arguments, received only " + args.length + " arguments");

        var sql = "CALL CreateConsumerEvent(?,?,?,?)";
        var event = jdbcTemplate.queryForObject(sql, rowMapper, args);

        log.info("Event created successfully, with id={}", event.getId());

        return event;
    }

    @Override
    public Object update(int id, Object... args) throws Exception {
        if(args.length < 3)
            throw new Exception("Expected 4 arguments, received only " + args.length + " arguments");

        var sql = "CALL UpdateConsumerEvent(?,?,?,?)";

        var params = new Object[args.length + 1];
        params[0] = id;
        System.arraycopy(args, 0, params, 1, args.length);

        var event = jdbcTemplate.queryForObject(sql, rowMapper, params);

        log.info("Event updated successfully");

        return event;
    }

    @Override
    public void delete(int id) {
        var sql = "CALL DeleteConsumerEvent(?);";

        jdbcTemplate.update(sql, id);
    }
}
