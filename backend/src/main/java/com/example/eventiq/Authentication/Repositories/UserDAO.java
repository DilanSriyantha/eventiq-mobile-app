package com.example.eventiq.Authentication.Repositories;

import com.example.eventiq.Authentication.Models.User;
import com.example.eventiq.Enums.Role;
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
public class UserDAO implements DAO<User> {

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<User> rowMapper = (rs, rowNum) -> User.builder()
            .id(rs.getInt("id"))
            .name(rs.getString("name"))
            .email(rs.getString("email"))
            .password(rs.getString("password"))
            .role(Role.valueOf(rs.getString("role")))
            .updatedAt(rs.getTimestamp("updated_at"))
            .createdAt(rs.getTimestamp("created_at"))
            .build();

    @Override
    public List<User> getAll() {
        var sql = "CALL GetAllUsers();";

        var users = jdbcTemplate.query(sql, rowMapper);

        return users;
    }

    @Override
    public Page<User> getPage(int page, int pageSize) {
        var contentSql = "CALL GetUsersPage(?, ?);";

        var offset = page * pageSize;
        var content = jdbcTemplate.query(contentSql, rowMapper, pageSize, offset);

        var countSql = "CALL GetUsersCount();";
        var count = jdbcTemplate.queryForObject(countSql, Integer.class);

        return new PageImpl<>(content, PageRequest.of(page, pageSize), count);
    }

    @Override
    public Page<User> getPageById(int id, int page, int pageSize) {
        return null;
    }

    @Override
    public Optional<User> get(int id) {
        var sql = "CALL GetUserById(?);";

        var user = jdbcTemplate.query(sql, rowMapper, id);

        if (user.isEmpty())
            return Optional.empty();

        return Optional.of(user.getFirst());
    }

    public Optional<User> getByEmail(String email) {
        var sql = "CALL GetUserByEmail(?);";

        var user = jdbcTemplate.query(sql, rowMapper, email);

        if (user.isEmpty())
            return Optional.empty();

        return Optional.of(user.getFirst());
    }

    @Override
    public User create(Object... args) throws Exception {
        if (args.length < 4)
            throw new Exception("Expected 4 arguments, received only " + args.length + " arguments");

        var sql = "CALL CreateUser(?,?,?,?)";
        var user = jdbcTemplate.queryForObject(sql, rowMapper, args);

        log.info("User created successfully with id={}", user.getId());

        return user;
    }

    @Override
    public User update(int id, Object... args) throws Exception {
        if (args.length < 4)
            throw new Exception("Expected 4 arguments, received only " + args.length + " arguments");

        var sql = "CALL UpdateUser(?,?,?,?,?)";

        var params = new Object[args.length + 1];
        params[0] = id;
        System.arraycopy(args, 0, params, 1, args.length);

        var user = jdbcTemplate.queryForObject(sql, rowMapper, params);

        log.info("User updated successfully");

        return user;
    }

    @Override
    public void delete(int id) {
        var sql = "CALL DeleteUser(?);";

        var rowsAffected = jdbcTemplate.update(sql, id);

        if (rowsAffected > 0) {
            log.info("User deleted successfully.");

            return;
        }
        log.error("Error occurred when deleting user id={}", id);
    }
}
