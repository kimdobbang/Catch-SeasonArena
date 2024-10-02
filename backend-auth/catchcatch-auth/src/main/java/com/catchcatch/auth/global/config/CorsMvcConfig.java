package com.catchcatch.auth.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("*")
                .exposedHeaders("Authorization", "Set-Cookie")
                .allowedOrigins("https://j11b106.p.ssafy.io", "http://localhost:3000")
                .allowCredentials(true);
    }
}
