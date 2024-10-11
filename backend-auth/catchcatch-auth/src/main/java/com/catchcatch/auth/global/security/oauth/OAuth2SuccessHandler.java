package com.catchcatch.auth.global.security.oauth;

import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.security.auth.PrincipalDetails;
import com.catchcatch.auth.global.security.auth.repository.RefreshTokenRepository;
import com.catchcatch.auth.global.security.jwt.JwtTokenProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Member member = ((PrincipalDetails) authentication.getPrincipal()).getMember();

        String accessToken = jwtTokenProvider.generateToken(member);

        log.info("access token : {}", accessToken);

        String redirectUrl = UriComponentsBuilder.
                fromUriString("https://j11b106.p.ssafy.io/oauth/token/" + accessToken)
                .build()
                .toString();

        response.setContentType("application/json;charset=UTF-8");
        response.sendRedirect(redirectUrl);
    }
}
