package com.catchcatch.auth.global.security.auth.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.time.Duration;

@Repository
@RequiredArgsConstructor
public class RefreshTokenRepository {

    private final RedisTemplate<Object, Object> redisTemplate;

    @Value("${jwt.refresh.token.expire}")
    private long refreshTokenExpire;

    public void saveByUserId(String email, String refreshToken) {
        ValueOperations<Object, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set("auth: "+email, refreshToken, Duration.ofHours(refreshTokenExpire));
    }

    public String findByUserId(String email) {
        ValueOperations<Object, Object> valueOperations = redisTemplate.opsForValue();
        return String.valueOf(valueOperations.get("auth: "+email));
    }

    public boolean existsByUserId(String email) {
        ValueOperations<Object, Object> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get("auth: "+email) != null;
    }

    public void deleteByUserId(String email) {
        redisTemplate.delete("auth: "+email);
    }
}
