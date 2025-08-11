package com.example.eventiq.Authentication.Repositories;

import com.example.eventiq.Authentication.Models.User;
import com.example.eventiq.Enums.Role;
import com.example.eventiq.Utils.DAO;
import com.example.eventiq.Utils.OnCompleted;
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
public class UserDAO implements DAO<User> {

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<User> rowMapper = (rs, rowNum) -> {
        return User.builder()
                .id(rs.getInt("id"))
                .name(rs.getString("name"))
                .email(rs.getString("email"))
                .password(rs.getString("password"))
                .role(Role.valueOf(rs.getString("role")))
                .updatedAt(rs.getTimestamp("updated_at"))
                .createdAt(rs.getTimestamp("created_at"))
                .build();
    };

    @Override
    public List<User> getAll() {
        var sql = "SELECT * FROM users;";

        var users = jdbcTemplate.query(sql, rowMapper);

        return users;
    }

    @Override
    public Page<User> getPage(int page, int pageSize) {
        var contentSql = "SELECT * FROM users ORDER BY id ASC LIMIT ? OFFSET ?;";

        var offset = page * pageSize;
        var content = jdbcTemplate.query(contentSql, rowMapper, pageSize, offset);

        var countSql = "SELECT COUNT(*) FROM users;";
        var count = jdbcTemplate.queryForObject(countSql, Integer.class);

        return new PageImpl<>(content, PageRequest.of(page, pageSize), count);
    }

    @Override
    public Optional<User> get(int id) {
        var sql = "SELECT * FROM users WHERE id=?;";

        var user = jdbcTemplate.queryForObject(sql, rowMapper, id);

        return Optional.of(user);
    }

    public Optional<User> getByEmail(String email) {
        var sql = "SELECT * FROM users WHERE email=?;";

        var user = jdbcTemplate.queryForObject(sql, rowMapper, email);

        return Optional.ofNullable(user);
    }

    @Override
    public void create(User user) {
        var sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?);";

        var rowsAffected = jdbcTemplate.update(sql,
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().name()
        );

        if(rowsAffected > 0) {
            log.info("User created successfully.");

            return;
        }
        log.error("Error occurred while creating a new user.");
    }

    @Override
    public void update(int id, User newDetails) {
        var sql = "UPDATE users SET name=?, email=?, role=? WHERE id=?;";

        var rowsAffected = jdbcTemplate.update(sql,
                newDetails.getName(),
                newDetails.getEmail(),
                newDetails.getRole()
        , id);

        if(rowsAffected > 0){
            log.info("User updated successfully.");

            return;
        }
        log.error("Error occurred while updating user id={}", id);
    }

    @Override
    public void delete(int id) {
        var sql = "DELETE FROM users WHERE id=?;";

        var rowsAffected = jdbcTemplate.update(sql, id);

        if(rowsAffected > 0) {
            log.info("User deleted successfully.");

            return;
        }
        log.error("Error occurred when deleting user id={}", id);
    }
}
