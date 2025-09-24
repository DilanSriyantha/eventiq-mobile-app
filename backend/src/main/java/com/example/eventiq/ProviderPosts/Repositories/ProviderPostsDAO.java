package com.example.eventiq.ProviderPosts.Repositories;

import com.example.eventiq.ProviderPosts.Models.ProviderPost;
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
public class ProviderPostsDAO implements DAO<ProviderPost> {

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<ProviderPost> rowMapper = (rs, rowNum) -> ProviderPost.builder()
            .id(rs.getInt("postId"))
            .providerId(rs.getInt("providerId"))
            .providerName(rs.getString("providerName"))
            .title(rs.getString("title"))
            .description(rs.getString("description"))
            .tags(rs.getString("tags"))
            .imageUrl(rs.getString("imageUrl"))
            .rate(rs.getFloat("rate"))
            .createdAt(rs.getTimestamp("created_at"))
            .updatedAt(rs.getTimestamp("updated_at"))
            .build();

    @Override
    public List<ProviderPost> getAll() {
        var sql = "CALL GetProviderPosts();";

        return jdbcTemplate.query(sql, rowMapper);
    }

    @Override
    public Page<ProviderPost> getPage(int pageSize, int page) {
        var contentSql = "CALL GetProviderPostsPage(?, ?);";

        var offset = page * pageSize;
        var content = jdbcTemplate.query(contentSql, rowMapper, pageSize, offset);

        var countSql = "CALL GetProviderPostsCount();";
        var count = jdbcTemplate.queryForObject(countSql, Integer.class);

        return new PageImpl<>(content, PageRequest.of(page, pageSize), count);
    }

    @Override
    public Page<ProviderPost> getPageById(int id, int pageSize, int page) {
        return null;
    }

    public Page<ProviderPost> getSearchResultsPage(String searchKey, int pageSize, int page) {
        var contentSql = "CALL GetProviderPostsSearchResultsPage(?, ?, ?);";

        var offset = page * pageSize;
        var content = jdbcTemplate.query(contentSql, rowMapper, pageSize, offset, searchKey);

        var countSql = "CALL GetProviderPostsSearchResultsCount(?);";
        var count = jdbcTemplate.queryForObject(countSql, Integer.class, searchKey);

        return new PageImpl<>(content, PageRequest.of(page, pageSize), count);
    }

    @Override
    public Optional<ProviderPost> get(int id) {
        var sql = "CALL GetProviderPost(?)";

        var post = jdbcTemplate.query(sql, rowMapper, id);

        if(post.isEmpty()) return Optional.empty();

        return Optional.of(post.getFirst());
    }

    @Override
    public ProviderPost create(Object... args) throws Exception {
        if(args.length < 5)
            throw new Exception("Expected 5 arguments, received only " + args.length + " arguments");

        var sql = "CALL CreateProviderPost(?, ?, ?, ?, ?);";
        var post = jdbcTemplate.queryForObject(sql, rowMapper, args);

        log.info("Post created successfully, with id={}", post.getId());

        return post;
    }

    @Override
    public ProviderPost update(int id, Object... args) throws Exception {
        if(args.length < 5)
            throw new Exception("Expected 5 arguments, received only " + args.length + " arguments");

        var sql = "CALL UpdateProviderPost(?, ?, ?, ?, ?, ?);";

        var params = new Object[args.length + 1];
        params[0] = id;
        System.arraycopy(args, 0, params, 1, args.length);

        var post = jdbcTemplate.queryForObject(sql, rowMapper, params);

        log.info("Post id={} updated", post.getId());

        return post;
    }

    @Override
    public void delete(int id) {
        var sql = "CALL DeleteProviderPost(?);";

        int affectedRows = jdbcTemplate.update(sql, id);

        log.info("Post id={} has been deleted, affectedRows={}", id, affectedRows);
    }
}
