package com.example.eventiq.Utils;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface DAO <T> {
    List<T> getAll();
    Page<T> getPage(int page, int pageSize);
    Optional<T> get(int id);
    void create(T request);
    void update(int id, T request);
    void delete(int id);
}
