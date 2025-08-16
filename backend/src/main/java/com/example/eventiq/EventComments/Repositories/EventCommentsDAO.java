package com.example.eventiq.EventComments.Repositories;

import com.example.eventiq.EventComments.Models.EventComment;
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
public class EventCommentsDAO implements DAO<EventComment> {
    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<EventComment> rowMapper = (rs, rowNum) -> EventComment.builder()
            .id(rs.getInt("id"))
            .eventId(rs.getInt("event_id"))
            .userId(rs.getInt("user_id"))
            .userName(rs.getString("user_name"))
            .comment(rs.getString("comment"))
            .createdAt(rs.getTimestamp("created_at"))
            .updatedAt(rs.getTimestamp("updated_at"))
            .build();

    @Override
    public List<EventComment> getAll() {
        var sql = "CALL GetEventComments();";

        return jdbcTemplate.query(sql, rowMapper);
    }

    @Override
    public Page<EventComment> getPage(int page, int pageSize) {
        return null;
    }

    public Page<EventComment> getPage(int eventId, int page, int pageSize) {
        var contentSql = "CALL GetEventCommentsPage(?, ?, ?);";

        var offset = page * pageSize;
        var content = jdbcTemplate.query(contentSql, rowMapper, eventId, pageSize, offset);

        var countSql = "CALL GetEventCommentsCount(?);";
        var count = jdbcTemplate.queryForObject(countSql, Integer.class, eventId);

        return new PageImpl<>(content, PageRequest.of(page, pageSize), count);
    }

    @Override
    public Optional<EventComment> get(int id) {
        var sql = "CALL GetEventComment(?);";

        var eventComment = jdbcTemplate.query(sql, rowMapper, id);

        if(eventComment.isEmpty()) return Optional.empty();

        return Optional.of(eventComment.getFirst());
    }

    @Override
    public void create(EventComment eventComment) {
        var sql = "CALL CreateEventComment(?, ?, ?);";

        var affectedRows = jdbcTemplate.update(sql,
                eventComment.getUserId(),
                eventComment.getEventId(),
                eventComment.getComment()
        );

        log.info("Comment created, affectedRow={}", affectedRows);
    }

    @Override
    public void update(int id, EventComment eventComment) {
        var sql = "CALL UpdateEventComment(?, ?);";

        var affectedRows = jdbcTemplate.update(sql,
                id,
                eventComment.getComment()
        );

        log.info("Comment id={} has been updated, affectedRows={}", id, affectedRows);
    }

    @Override
    public void delete(int id) {
        var sql = "CALL DeleteEventComment(?);";

        var affectedRows = jdbcTemplate.update(sql, id);

        log.info("Comment id={} has been deleted, affectedRows={}", id, affectedRows);
    }
}
