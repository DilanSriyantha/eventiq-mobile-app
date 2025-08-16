package com.example.eventiq.EventComments.Services;

import com.example.eventiq.EventComments.Models.EventComment;
import com.example.eventiq.EventComments.Repositories.EventCommentsDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventCommentsService {
    private final EventCommentsDAO eventCommentsDAO;

    public List<EventComment> getAll() {
        return eventCommentsDAO.getAll();
    }

    public Page<EventComment> getPage(int eventId, int page, int pageSize) {
        return eventCommentsDAO.getPage(eventId, page, pageSize);
    }

    public Optional<EventComment> get(int commentId) {
        return eventCommentsDAO.get(commentId);
    }

    public void create(EventComment createRequest) {
        eventCommentsDAO.create(createRequest);
    }

    public void update(EventComment updateRequest) {
        eventCommentsDAO.update(updateRequest.getId(), updateRequest);
    }

    public void delete(int commentId) {
        eventCommentsDAO.delete(commentId);
    }
}
