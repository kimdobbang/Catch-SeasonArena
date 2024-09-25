package com.catchcatch.auth.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components().addSecuritySchemes("bearer-key",
                        new SecurityScheme().type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList("bearer-key"))
                .info(new Info().title("캐치캐치 : 시즌 아레나 API")
                        .description("캐치캐치 : 시즌 아레나 API 문서")
                        .version("1.0"))
                .servers(Arrays.asList(new Server().url("https://j11b106.p.ssafy.io/"), new Server().url("http://localhost:8080/")));  // 서버 URL을 HTTPS로 설정 및 기본 경로 추가
    }
}