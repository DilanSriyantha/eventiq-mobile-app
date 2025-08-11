package com.example.eventiq.Authentication.Controllers;

import com.example.eventiq.Authentication.DTOs.AuthResponse;
import com.example.eventiq.Authentication.DTOs.LoginRequest;
import com.example.eventiq.Authentication.DTOs.RefreshRequest;
import com.example.eventiq.Authentication.DTOs.RegisterRequest;
import com.example.eventiq.Authentication.Service.AuthService;
import com.example.eventiq.Types.SuccessResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/")
    public @ResponseBody ResponseEntity<String> handleRootRequest() {
        return ResponseEntity.ok("Hello World!");
    }

    @PostMapping("/register")
    public @ResponseBody ResponseEntity<AuthResponse> handleRegisterRequest(@RequestBody RegisterRequest registerRequest, HttpServletResponse response) {
        var authResponse = authService.register(registerRequest);

        var accessTokenCookie = new Cookie("accessToken", authResponse.getAccessToken());
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(false); // true on production
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(60 * 10); // 10 minutes

        var refreshTokenCookie = new Cookie("refreshToken", authResponse.getRefreshToken());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false); // true on production
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(60 * 60 * 24 * 7); // 7 days

        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public @ResponseBody ResponseEntity<AuthResponse> handleLoginRequest(@RequestBody LoginRequest loginRequest) throws Exception {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/refresh")
    public @ResponseBody ResponseEntity<AuthResponse> handleRefreshRequest(@RequestBody RefreshRequest refreshRequest) throws Exception {
        return ResponseEntity.ok(authService.refresh(refreshRequest));
    }

    @DeleteMapping("/delete")
    public @ResponseBody ResponseEntity<SuccessResponse> handleDeleteRequest(@RequestParam("id") int id) throws Exception {
        return ResponseEntity.ok(authService.delete(id));
    }
}
