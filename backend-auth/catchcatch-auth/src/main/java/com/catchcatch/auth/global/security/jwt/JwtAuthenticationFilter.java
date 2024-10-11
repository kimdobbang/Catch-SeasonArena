package com.catchcatch.auth.global.security.jwt;

import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.LoginRequestDto;
import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.exception.CustomException;
import com.catchcatch.auth.global.exception.ExceptionResponse;
import com.catchcatch.auth.global.security.auth.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

@RequiredArgsConstructor
@AllArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private ObjectMapper objectMapper;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            LoginRequestDto member = objectMapper.readValue(request.getInputStream(), LoginRequestDto.class);
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(member.email(), member.password());

            return authenticationManager.authenticate(authenticationToken);
        }catch (IOException e){
            log.error("BACK-AUTH:ERROR {}", CustomException.ID_PASSWORD_INPUT_EXCEPTION);
            throw new ExceptionResponse(CustomException.ID_PASSWORD_INPUT_EXCEPTION);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        Member member = ((PrincipalDetails) authentication.getPrincipal()).getMember();
        String accessToken = jwtTokenProvider.generateToken(member);
        log.info("BACK-AUTH:ACCESS_TOKEN : {}", accessToken);

        String jsonResponse = "{"
                + "\"data\": {"
                + "\"msg\": \"로그인완료했습니다.\","
                + "\"code\": \"SUCCESS_LOGIN\","
                + "\"status\": 200"
                + "}"
                + "}";

        response.addHeader("Authorization", "Bearer " + accessToken);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(jsonResponse);
    }

}
