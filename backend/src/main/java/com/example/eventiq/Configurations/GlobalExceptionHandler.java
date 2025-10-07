package com.example.eventiq.Configurations;

import com.example.eventiq.Types.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public @ResponseBody ResponseEntity<String> handleException(Exception ex) {
        log.error(ex.getMessage(), ex);

        return ResponseEntity.status(500).body(ex.getMessage());
    }
}
