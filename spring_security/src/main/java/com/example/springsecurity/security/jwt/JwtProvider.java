package com.example.springsecurity.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtProvider {


    @Value("${jwt.secret}")
    private String secret;


    private SecretKey getSigninKey() {

        byte[] keyBytes = Base64.getDecoder().decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);

    }


    public String generateToken(Authentication authentication) {
        String username = authentication.getName();

        String roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + 86400000);

        return Jwts.builder()
                .setSubject(username)
                .claim("roles",roles )
                .setExpiration(expireDate)
                .setIssuedAt(new Date())
                .signWith(getSigninKey(), SignatureAlgorithm.HS512)
                .compact();

    }


    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigninKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            throw new AuthenticationCredentialsNotFoundException("Jwt expired or incorrect");
        }
    }

    public String getUserFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigninKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();

    }


}
