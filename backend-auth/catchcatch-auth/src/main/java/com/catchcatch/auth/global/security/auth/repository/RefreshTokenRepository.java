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

    public void saveByUserId(long memberId, String refreshToken) {
        ValueOperations<Object, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set("auth: "+memberId, refreshToken, Duration.ofHours(refreshTokenExpire));
    }

    public String findByUserId(long memberId) {
        ValueOperations<Object, Object> valueOperations = redisTemplate.opsForValue();
        return String.valueOf(valueOperations.get("auth: "+memberId));
    }

    public boolean existsByUserId(long memberId) {
        ValueOperations<Object, Object> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get("auth: "+memberId) != null;
    }

    public void deleteByUserId(long memberId) {
        redisTemplate.delete("auth: "+memberId);
    }
}
