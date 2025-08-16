package com.example.eventiq.ConsumerEvents.Services;

import com.example.eventiq.ConsumerEvents.Models.ConsumerEvent;
import com.example.eventiq.ConsumerEvents.Repositories.ConsumerEventsDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConsumerEventsService {
    private final ConsumerEventsDAO consumerEventsDAO;

    public List<ConsumerEvent> getAll(int userId) {
        return consumerEventsDAO.getAll(userId);
    }

    public Page<ConsumerEvent> getPage(int userId, int page, int pageSize) {
        return consumerEventsDAO.getPage(userId, page, pageSize);
    }

    public Optional<ConsumerEvent> get(int eventId) {
        return consumerEventsDAO.get(eventId);
    }

    public void create(ConsumerEvent createRequest) {
        consumerEventsDAO.create(createRequest);
    }

    public void update(ConsumerEvent updateRequest) {
        consumerEventsDAO.update(updateRequest.getId(), updateRequest);
    }

    public void delete(int eventId) {
        consumerEventsDAO.delete(eventId);
    }
}
