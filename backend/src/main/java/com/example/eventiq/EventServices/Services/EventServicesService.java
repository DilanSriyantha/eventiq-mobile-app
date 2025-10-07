package com.example.eventiq.EventServices.Services;

import com.example.eventiq.ConsumerEvents.DTOs.AddServiceRequest;
import com.example.eventiq.ConsumerEvents.DTOs.RemoveServiceRequest;
import com.example.eventiq.EventServices.Models.EventService;
import com.example.eventiq.EventServices.Repositories.EventServicesDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventServicesService {
    private final EventServicesDAO eventServicesDAO;

    public List<EventService> getAll(int eventId) {
        return eventServicesDAO.getAllById(eventId);
    }

    public Page<EventService> getPage(int eventId, int page, int pageSize) {
        return eventServicesDAO.getPageById(eventId, page, pageSize);
    }

    public void addServiceToEvent(AddServiceRequest request) {
        eventServicesDAO.addServiceToEvent(request.getEventId(), request.getServiceId());
    }

    public void removeServiceFromEvent(RemoveServiceRequest request) {
        eventServicesDAO.removeServiceFromEvent(request.getEventId(), request.getServiceId());
    }
}
