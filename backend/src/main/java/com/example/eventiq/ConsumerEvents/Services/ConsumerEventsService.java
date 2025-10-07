package com.example.eventiq.ConsumerEvents.Services;

import com.example.eventiq.Authentication.Repositories.UserDAO;
import com.example.eventiq.ConsumerEvents.DTOs.CreateEventRequest;
import com.example.eventiq.ConsumerEvents.DTOs.UpdateEventRequest;
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
    private final UserDAO userDAO;

    public List<ConsumerEvent> getAllByUser(String userEmail) throws Exception {
        var user = userDAO.getByEmail(userEmail)
                .orElseThrow(() -> new Exception("User not found"));

        return consumerEventsDAO.getAllById(user.getId());
    }

    public Page<ConsumerEvent> getPage(String userEmail, int page, int pageSize) throws Exception {
        var user = userDAO.getByEmail(userEmail)
                .orElseThrow(() -> new Exception("User not found"));

        return consumerEventsDAO.getPageById(user.getId(), page, pageSize);
    }

    public Optional<ConsumerEvent> get(int eventId) {
        return consumerEventsDAO.get(eventId);
    }

    public ConsumerEvent create(CreateEventRequest request) throws Exception {
        var user = userDAO.getByEmail(request.getUserEmail())
                .orElseThrow(() -> new Exception("User not found"));

        var event = consumerEventsDAO.create(
                user.getId(),
                request.getTitle(),
                request.getDescription(),
                request.getDate()
        );

        return (ConsumerEvent) event;
    }

    public ConsumerEvent update(UpdateEventRequest request) throws Exception {
        var event = consumerEventsDAO.update(
                request.getId(),
                request.getTitle(),
                request.getDescription(),
                request.getDate()
        );

        return (ConsumerEvent) event;
    }

    public void delete(int eventId) {
        consumerEventsDAO.delete(eventId);
    }
}
