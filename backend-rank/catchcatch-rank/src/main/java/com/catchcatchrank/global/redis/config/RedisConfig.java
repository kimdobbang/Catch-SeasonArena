package com.catchcatchrank.global.redis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

@Configuration
public class RedisConfig {

	@Bean
	public RedisTemplate<String, Object> redisTemplateBronze() {
		RedisTemplate<String, Object> template = new RedisTemplate<>();
		template.setConnectionFactory(redisConnectionFactory("3.36.122.163", 7001)); // Bronze 노드
		return template;
	}

	@Bean
	public RedisTemplate<String, Object> redisTemplateSilver() {
		RedisTemplate<String, Object> template = new RedisTemplate<>();
		template.setConnectionFactory(redisConnectionFactory("3.36.122.163", 7002)); // Silver 노드
		return template;
	}

	@Bean
	public RedisTemplate<String, Object> redisTemplateGold() {
		RedisTemplate<String, Object> template = new RedisTemplate<>();
		template.setConnectionFactory(redisConnectionFactory("3.36.122.163", 7003)); // Gold 노드
		return template;
	}

	private RedisConnectionFactory redisConnectionFactory(String host, int port) {
		RedisStandaloneConfiguration config = new RedisStandaloneConfiguration(host, port);
		return new LettuceConnectionFactory(config);
	}
}