package com.example.eventiq.SessionStatus.Controllers;

import com.example.eventiq.SessionStatus.Services.SessionStatusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api/v1/session-status")
@RequiredArgsConstructor
@Slf4j
public class SessionStatusController {

    private final SessionStatusService sessionStatusService;

    @GetMapping("/")
    public @ResponseBody ResponseEntity<?> handleCheckSessionStatus(@CookieValue(value = "accessToken", required = false) String accessToken) {
        log.info(accessToken);

        if(!sessionStatusService.isSessionValid(accessToken))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid or expired session");

        return ResponseEntity.ok("Session is valid");
    }
}
