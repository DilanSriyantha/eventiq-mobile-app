package com.example.eventiq.Configurations;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${jwt.secret}")
    private String SECRET;

    private static final long ACCESS_TOKEN_LIFESPAN = (1000 * 60 * 10); // 10 minutes
    private static final long REFRESH_TOKEN_LIFESPAN = (1000 * 60 * 60 * 24 * 7); // 7 days

    public String extractEmail(String token) {
        try{
            return extractClaim(token, Claims::getSubject);
        }catch (Exception ex){
            return null;
        }
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        return (userDetails.getUsername().equals(extractEmail(token)) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) {
        try{
            return extractClaim(token, Claims::getExpiration).before(new Date());
        }catch (Exception ex){
            return true;
        }
    }

    public String generateAccessToken(UserDetails userDetails) {
        return generateToken(userDetails, new HashMap<>(), ACCESS_TOKEN_LIFESPAN);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(userDetails, new HashMap<>(), REFRESH_TOKEN_LIFESPAN);
    }

    public String generateToken(UserDetails userDetails, HashMap<String, Object> extraClaims, long lifespan) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + lifespan))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        var claims = extractClaims(token);

        return claimResolver.apply(claims);
    }

    private Claims extractClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] bytes = Decoders.BASE64.decode(SECRET);

        return Keys.hmacShaKeyFor(bytes);
    }

}
