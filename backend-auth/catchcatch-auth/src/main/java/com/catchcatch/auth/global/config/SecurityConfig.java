package com.catchcatch.auth.global.config;

import com.catchcatch.auth.domains.member.domain.Role;
import com.catchcatch.auth.global.security.auth.repository.RefreshTokenRepository;
import com.catchcatch.auth.global.security.exceptionHandler.CustomExceptionHandler;
import com.catchcatch.auth.global.security.jwt.JwtAuthenticationFilter;
import com.catchcatch.auth.global.security.jwt.JwtAuthorizationFilter;
import com.catchcatch.auth.global.security.jwt.JwtTokenProvider;
import com.catchcatch.auth.global.security.oauth.OAuth2Service;
import com.catchcatch.auth.global.security.oauth.OAuth2SuccessHandler;
import com.catchcatch.auth.global.security.oauth.OAuth2FailHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;
    private final RefreshTokenRepository refreshTokenRepository;
    private final OAuth2Service oAuth2Service;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final OAuth2FailHandler oAuthFailHandler;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() throws Exception {
        JwtAuthenticationFilter filter = new JwtAuthenticationFilter(authenticationManager(authenticationConfiguration), jwtTokenProvider, objectMapper);
        filter.setFilterProcessesUrl("/api/auth/members/login");
        filter.setAuthenticationManager(authenticationManager(authenticationConfiguration));
        return filter;
    }

    @Bean
    public JwtAuthorizationFilter jwtAuthorizationFilter(){
        return new JwtAuthorizationFilter(jwtTokenProvider);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CustomExceptionHandler customExceptionHandler) throws Exception {
        http.csrf((csrf) -> csrf.disable());
        http.cors(Customizer.withDefaults());
        http.formLogin((formLogin) -> formLogin.disable());
        http.httpBasic((httpBasic) -> httpBasic.disable());
        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers("/api/auth/members/info/**",
                        "/api/auth/members/avatar/**",
                        "/api/auth/members/nickname/**").hasRole("USER")
                .requestMatchers("/api/auth/inventories/**").hasRole("USER")
                .requestMatchers("/api/auth/rankings/**").hasRole("USER")
                .requestMatchers("/api/auth/endgame/**").hasRole("USER")
                .requestMatchers("/api/auth/v3/api-docs/**", "/api/auth/swagger-ui/**", "/api/auth/swagger-resources/**").permitAll()
                .requestMatchers("/api/auth/members/**").permitAll()
            .anyRequest().authenticated());

        http.oauth2Login((oauth) ->
                oauth.userInfoEndpoint(c -> c.userService(oAuth2Service))
                        .successHandler(oAuth2SuccessHandler)
                        .failureHandler(oAuthFailHandler)
                        .redirectionEndpoint(
                                (redirectionEndpointConfig) -> redirectionEndpointConfig.baseUri(("/api/auth/login/oauth2/code/*")))
                        .authorizationEndpoint((authorizationEndpointConfig) ->
                                authorizationEndpointConfig.baseUri("/api/auth/oauth2/authorization"))
        );

        http.exceptionHandling((handle) -> handle.authenticationEntryPoint(customExceptionHandler));
        http.addFilterBefore(jwtAuthorizationFilter(), JwtAuthenticationFilter.class);
        http.addFilterAt(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        http.sessionManagement((session) ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }
}
