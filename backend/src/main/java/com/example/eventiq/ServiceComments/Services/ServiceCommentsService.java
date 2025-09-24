package com.example.eventiq.ServiceComments.Services;

import com.example.eventiq.Authentication.Repositories.UserDAO;
import com.example.eventiq.ServiceComments.DTOs.CommentCreateRequest;
import com.example.eventiq.ServiceComments.DTOs.CommentUpdateRequest;
import com.example.eventiq.ServiceComments.Models.Comment;
import com.example.eventiq.ServiceComments.Repositories.ServiceCommentsDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceCommentsService {
    private final ServiceCommentsDAO serviceCommentsDAO;
    private final UserDAO userDAO;

    public List<Comment> getAll(int serviceId) {
        return serviceCommentsDAO.getAll(serviceId);
    }

    public Page<Comment> getPage(int serviceId, int page, int pageSize) {
        return serviceCommentsDAO.getPageById(serviceId, page, pageSize);
    }

    public Comment create(CommentCreateRequest request) throws Exception {
        var user = userDAO.getByEmail(request.getUserEmail())
                .orElseThrow(() -> new Exception("User not found"));

        return serviceCommentsDAO.create(user.getId(), request.getServiceId(), request.getCommentBody());
    }

    public void update(CommentUpdateRequest request) throws Exception {
        serviceCommentsDAO.update(
                request.getCommentId(),
                request.getCommentBody()
        );
    }

    public void delete(int id) {
        serviceCommentsDAO.delete(id);
    }
}
