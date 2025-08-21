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

    public List<ConsumerEvent> getAll(int id) {
        var sql = "CALL GetConsumerEvents(?);";

        return jdbcTemplate.query(sql, rowMapper, id);
    }

    @Override
    public Page<ConsumerEvent> getPage(int page, int pageSize) {
        return null;
    }

    public Page<ConsumerEvent> getPage(int userId, int page, int pageSize) {
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
    public void create(ConsumerEvent request) {
        var sql = "CALL CreateConsumerEvent(?, ?, ?, ?);";

        jdbcTemplate.update(sql,
                request.getUserId(),
                request.getTitle(),
                request.getDescription(),
                request.getDate()
        );
    }

    @Override
    public void update(int id, ConsumerEvent request) {
        var sql = "CALL UpdateConsumerEvent(?, ?, ?, ?);";

        jdbcTemplate.update(sql,
                request.getId(),
                request.getTitle(),
                request.getDescription(),
                request.getDate()
        );
    }

    @Override
    public void delete(int id) {
        var sql = "CALL DeleteConsumerEvent(?);";

        jdbcTemplate.update(sql, id);
    }
}
