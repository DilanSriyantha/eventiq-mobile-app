package com.example.eventiq.SessionStatus.Services;

import com.example.eventiq.Authentication.Repositories.UserDAO;
import com.example.eventiq.Configurations.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SessionStatusService {

    private final JwtService jwtService;
    private final UserDAO userDAO;

    public boolean isSessionValid(String accessToken) {
        if(accessToken == null || accessToken.isBlank())
            return false;

        if(jwtService.isTokenExpired(accessToken))
            return false;

        try{
            var email = jwtService.extractEmail(accessToken);
            if(email == null) return false;

            var user = userDAO.getByEmail(email).orElse(null);
            if(user == null) return false;

            return jwtService.isTokenValid(accessToken, user);
        }catch (Exception e){
            return false;
        }
    }
}
