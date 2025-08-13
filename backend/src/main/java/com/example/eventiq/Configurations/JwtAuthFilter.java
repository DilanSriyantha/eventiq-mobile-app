package com.example.eventiq.Configurations;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        String jwtToken;
        String email;

        if(request.getRequestURI().equals("/api/v1/session-status/")){
            filterChain.doFilter(request, response);

            return;
        }

        if(request.getRequestURI().equals("/api/v1/auth/")) {
            filterChain.doFilter(request, response);

            return;
        }

        if(request.getRequestURI().equals("/api/v1/auth/register")) {
            filterChain.doFilter(request, response);

            return;
        }

        if(request.getRequestURI().equals("/api/v1/auth/refresh")) {
            filterChain.doFilter(request, response);

            return;
        }

        if(authHeader != null || authHeader.startsWith("Bearer"))
            jwtToken = authHeader.substring(7);
        else
            jwtToken = Arrays.stream(request.getCookies())
                    .filter(c -> "accessToken".equals(c.getName()))
                    .map(Cookie::getValue)
                    .findFirst()
                    .orElse(null);

        if(jwtToken == null) {
            filterChain.doFilter(request, response);

            return;
        }

        if(jwtService.isTokenExpired(jwtToken)) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");
            response.getWriter().write("{\"statusCode\":" + HttpStatus.UNAUTHORIZED.value() + ",\"message\":\"JwtToken is expired. Please log in to the system again.\"}");

            return;
        }

        email = jwtService.extractEmail(jwtToken);

        if(email == null || SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);

            return;
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        if(!jwtService.isTokenValid(jwtToken, userDetails)) {
            filterChain.doFilter(request, response);

            return;
        }

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        authToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
