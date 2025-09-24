package com.example.eventiq.Utils;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface DAO <T> {
    List<T> getAll();
    Page<T> getPage(int page, int pageSize);
    Page<T> getPageById(int id, int page, int pageSize);
    Optional<T> get(int id);
    Object create(Object... args) throws Exception;
    Object update(int id, Object... args) throws Exception;
    void delete(int id);
}
