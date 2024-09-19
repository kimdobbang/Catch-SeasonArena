package com.catchcatch.auth.global.security.jwt;

import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.LoginRequestDto;
import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.exception.CustomException;
import com.catchcatch.auth.global.exception.ExceptionResponse;
import com.catchcatch.auth.global.security.auth.PrincipalDetails;
import com.catchcatch.auth.global.security.auth.repository.RefreshTokenRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
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
    private final RefreshTokenRepository refreshTokenRepository;

    //로그인 요청 시 실행
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
        long memberId = member.getMemberId();

        String accessToken = jwtTokenProvider.generateAccessToken(member);
        String refreshToken = jwtTokenProvider.generateRefreshToken(member);

        log.info("BACK-AUTH:ACCESS_TOKEN : {}", accessToken);
        log.info("BACK-AUTH:REFRESH_TOKEN : {}", refreshToken);

        if(refreshTokenRepository.existsByUserId(memberId)){
            refreshTokenRepository.deleteByUserId(memberId);
        }

        refreshTokenRepository.saveByUserId(memberId, refreshToken);

        response.addHeader("Authorization", "Bearer " + accessToken);
        response.addCookie(createCookie("refreshToken", refreshToken));
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("Login Success");
    }

    private Cookie createCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        cookie.setHttpOnly(true);
        return cookie;
    }
}
