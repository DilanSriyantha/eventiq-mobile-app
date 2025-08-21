package com.example.eventiq.Authentication.Controllers;

import com.example.eventiq.Authentication.DTOs.AuthResponse;
import com.example.eventiq.Authentication.DTOs.LoginRequest;
import com.example.eventiq.Authentication.DTOs.RefreshRequest;
import com.example.eventiq.Authentication.DTOs.RegisterRequest;
import com.example.eventiq.Authentication.Models.User;
import com.example.eventiq.Authentication.Service.AuthService;
import com.example.eventiq.Types.SuccessResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/")
    public @ResponseBody ResponseEntity<String> handleRootRequest() {
        return ResponseEntity.ok("Hello World!");
    }

    @GetMapping("/getAllUsers")
    public @ResponseBody ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(authService.getAll());
    }

    @GetMapping("/getUsersPage")
    public @ResponseBody ResponseEntity<Page<User>> getUsersPage(@RequestParam("pageSize") int pageSize, @RequestParam("page") int page) {
        return ResponseEntity.ok(authService.getPage(pageSize, page));
    }

    @GetMapping("/getUserById")
    public @ResponseBody ResponseEntity<Optional<User>> getUserById(@RequestParam("id") int id) {
        return ResponseEntity.ok(authService.getById(id));
    }

    @GetMapping("/getUserByEmail")
    public @ResponseBody ResponseEntity<Optional<User>> getUserByEmail(@RequestParam("email") String email) {
        return ResponseEntity.ok(authService.getByEmail(email));
    }

    @PostMapping("/register")
    public @ResponseBody ResponseEntity<AuthResponse> handleRegisterRequest(@RequestBody RegisterRequest registerRequest, HttpServletResponse response) {
        return ResponseEntity.ok(authService.register(registerRequest));
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
