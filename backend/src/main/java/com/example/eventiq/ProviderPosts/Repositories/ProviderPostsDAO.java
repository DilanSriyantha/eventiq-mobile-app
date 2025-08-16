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
            .postId(rs.getInt("postId"))
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
    public void create(ProviderPost providerPost) {
        var sql = "CALL CreateProviderPost(?, ?, ?, ?, ?);";

        jdbcTemplate.update(sql,
                providerPost.getProviderId(),
                providerPost.getTitle(),
                providerPost.getDescription(),
                providerPost.getTags(),
                providerPost.getImageUrl()
        );
    }

    @Override
    public void update(int id, ProviderPost providerPost) {
        var sql = "CALL UpdateProviderPost(?, ?, ?, ?, ?, ?);";

        jdbcTemplate.update(sql,
                providerPost.getPostId(),
                providerPost.getTitle(),
                providerPost.getDescription(),
                providerPost.getTags(),
                providerPost.getImageUrl(),
                providerPost.getRate()
        );
    }

    @Override
    public void delete(int id) {
        var sql = "CALL DeleteProviderPost(?);";

        jdbcTemplate.update(sql, id);
    }
}
