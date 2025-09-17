package com.example.eventiq.ServiceComments.Repositories;

import com.example.eventiq.ServiceComments.DTOs.CommentCreateRequest;
import com.example.eventiq.ServiceComments.DTOs.CommentUpdateRequest;
import com.example.eventiq.ServiceComments.Models.Comment;
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
public class ServiceCommentsDAO implements DAO<Comment> {
    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<Comment> rowMapper = (rs, rowNum) -> Comment.builder()
            .id(rs.getInt("comment_id"))
            .userId(rs.getInt("user_id"))
            .serviceId(rs.getInt("service_id"))
            .username(rs.getString("username"))
            .serviceTitle(rs.getString("service_title"))
            .body(rs.getString("comment_body"))
            .createdAt(rs.getTimestamp("created_at"))
            .updatedAt(rs.getTimestamp("updated_at"))
            .build();

    @Override
    public List<Comment> getAll() {
        return null;
    }

    public List<Comment> getAll(int serviceId) {
        var sql = "CALL GetAllComments(?)";

        return jdbcTemplate.query(sql, rowMapper, serviceId);
    }

    @Override
    public Page<Comment> getPage(int page, int pageSize) {
        return null;
    }

    public Page<Comment> getPage(int serviceId, int page, int pageSize) {
        var contentSql = "CALL GetCommentsPage(?,?,?)";
        var offset = page * pageSize;
        var content = jdbcTemplate.query(contentSql, rowMapper, serviceId, pageSize, offset);

        var countSql = "CALL GetCommentsCount(?)";
        var count = jdbcTemplate.queryForObject(countSql, Integer.class, serviceId);

        return new PageImpl<>(content, PageRequest.of(page, pageSize), count);
    }

    @Override
    public Optional<Comment> get(int id) {
        return Optional.empty();
    }

    @Override
    public void create(Comment request) {

    }

    public void create(int userId, int serviceId, String commentBody) {
        var sql = "CALL CreateComment(?,?,?)";

        var affectedRows = jdbcTemplate.update(sql, userId, serviceId, commentBody);

        log.info("Comment created successfully, rowsAffected={}", affectedRows);
    }

    @Override
    public void update(int id, Comment request) {

    }

    public void update(CommentUpdateRequest request) {
        var sql = "CALL UpdateComment(?,?)";

        var affectedRows = jdbcTemplate.update(sql, request.getCommentId(), request.getCommentBody());

        log.info("Comment updated successfully, rowsAffected={}", affectedRows);
    }

    @Override
    public void delete(int commentId) {
        var sql = "CALL DeleteComment(?)";

        var affectedRows = jdbcTemplate.update(sql, commentId);

        log.info("Comment id={} deleted successfully, rowsAffected={}", commentId, affectedRows);
    }
}
