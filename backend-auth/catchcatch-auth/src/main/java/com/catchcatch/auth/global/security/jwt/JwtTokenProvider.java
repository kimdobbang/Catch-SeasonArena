package com.catchcatch.auth.global.security.jwt;

import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.config.JwtValueConfig;
import com.catchcatch.auth.global.exception.CustomException;
import com.catchcatch.auth.global.exception.ExceptionResponse;
import com.catchcatch.auth.global.security.auth.PrincipalDetails;
import com.catchcatch.auth.global.security.auth.PrincipalDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {

    private final JwtValueConfig config;

    private final PrincipalDetailsService principalDetailsService;

    public String generateToken(Member member) {
        Date date = new Date();
        Date expireDate = new Date(date.getTime() + config.getAccessExpirationTime());

        return Jwts.builder()
                .claim("email", member.getEmail())
                .issuedAt(date)
                .expiration(expireDate)
                .signWith(config.getSecretKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try{
            Jwts.parser()
                    .verifyWith(config.getSecretKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException e){
            log.error("BACK-AUTH:ERROR {}", CustomException.EXPIRED_JWT_EXCEPTION);
            throw new ExceptionResponse(CustomException.EXPIRED_JWT_EXCEPTION);
        } catch (JwtException e){
            log.error("BACK-AUTH:ERROR {}", CustomException.NOT_VALID_JWT_EXCEPTION);
            throw new ExceptionResponse(CustomException.NOT_VALID_JWT_EXCEPTION);
        }
    }

    public boolean doValidateToken(String token) {
        try{
            Jwts.parser()
                    .verifyWith(config.getSecretKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    public String getEmail(String token) {
        return Jwts.parser()
                .verifyWith(config.getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("email", String.class);
    }

    public Authentication getAuthentication(String token) {
        String memberEmail = getEmail(token);
        PrincipalDetails principalDetails = (PrincipalDetails) principalDetailsService.loadUserByUsername(memberEmail);

        return new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
    }
}
