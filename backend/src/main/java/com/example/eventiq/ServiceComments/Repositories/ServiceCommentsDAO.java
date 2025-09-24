package com.example.eventiq.ServiceComments.Repositories;

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

    @Override
    public Page<Comment> getPageById(int id, int page, int pageSize) {
        var contentSql = "CALL GetCommentsPage(?,?,?)";
        var offset = page * pageSize;
        var content = jdbcTemplate.query(contentSql, rowMapper, id, pageSize, offset);

        var countSql = "CALL GetCommentsCount(?)";
        var count = jdbcTemplate.queryForObject(countSql, Integer.class, id);

        return new PageImpl<>(content, PageRequest.of(page, pageSize), count);
    }

    @Override
    public Optional<Comment> get(int id) {
        return Optional.empty();
    }

    @Override
    public Comment create(Object... args) throws Exception {
        if(args.length < 3)
            throw new Exception("Expected 3 arguments, received only " + args.length + " arguments");

        var sql = "CALL CreateComment(?,?,?)";
        var comment = jdbcTemplate.queryForObject(sql, rowMapper, args);

        log.info("Comment created successfully, with id={}", comment.getId());

        return comment;
    }

    @Override
    public Comment update(int id, Object... args) throws Exception {
        if(args.length < 2)
            throw new Exception("Expected 2 arguments, received only " + args.length + " arguments");

        var sql = "CALL UpdateComment(?,?)";

        var params = new Object[args.length + 1];
        params[0] = id;
        System.arraycopy(args, 0, params, 1, args.length);

        var comment = jdbcTemplate.queryForObject(sql, rowMapper, params);

        log.info("Comment id={} updated successfully", comment.getId());

        return comment;
    }

    @Override
    public void delete(int commentId) {
        var sql = "CALL DeleteComment(?)";

        var affectedRows = jdbcTemplate.update(sql, commentId);

        log.info("Comment id={} deleted successfully, rowsAffected={}", commentId, affectedRows);
    }
}
