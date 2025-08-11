package com.example.eventiq.Authentication.Service;

import com.example.eventiq.Authentication.DTOs.AuthResponse;
import com.example.eventiq.Authentication.DTOs.LoginRequest;
import com.example.eventiq.Authentication.DTOs.RefreshRequest;
import com.example.eventiq.Authentication.DTOs.RegisterRequest;
import com.example.eventiq.Authentication.Models.User;
import com.example.eventiq.Authentication.Repositories.UserDAO;
import com.example.eventiq.Configurations.JwtService;
import com.example.eventiq.Types.SuccessResponse;
import com.example.eventiq.Utils.OnCompleted;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserDAO userDAO;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userDAO.create(user);

        var accessToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthResponse.builder()
                .name(request.getName())
                .email(request.getEmail())
                .role(request.getRole())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthResponse login(LoginRequest request) throws  Exception {
        var user = userDAO.getByEmail(request.getEmail())
                .orElseThrow(() -> new Exception("User not found."));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        var accessToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthResponse refresh(RefreshRequest request) throws Exception {
        var token = request.getRefreshToken();

        var email = jwtService.extractEmail(token);

        if(email == null)
            throw new BadRequestException("Invalid refresh token.");

        var user = userDAO.getByEmail(email)
                .orElseThrow(() -> new Exception("User not found."));

        if(!jwtService.isTokenValid(token, user))
            throw new Exception("Refresh token is invalid.");

        var accessToken = jwtService.generateAccessToken(user);

        return AuthResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .accessToken(accessToken)
                .refreshToken(request.getRefreshToken())
                .build();
    }

    public SuccessResponse delete(int id) {
        userDAO.delete(id);

        return SuccessResponse.builder()
                .status(HttpStatus.OK.value())
                .message("user id=" + id + " is deleted.")
                .build();
    }
}
