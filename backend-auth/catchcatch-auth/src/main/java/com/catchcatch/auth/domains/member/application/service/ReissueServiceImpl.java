package com.catchcatch.auth.domains.member.application.service;

import com.catchcatch.auth.domains.member.application.port.in.ReissueUseCase;
import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.exception.CustomException;
import com.catchcatch.auth.global.exception.ExceptionResponse;
import com.catchcatch.auth.global.security.auth.PrincipalDetails;
import com.catchcatch.auth.global.security.auth.repository.RefreshTokenRepository;
import com.catchcatch.auth.global.security.jwt.JwtTokenProvider;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "auth")
public class ReissueServiceImpl implements ReissueUseCase {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    @Transactional
    public String reissue(Cookie cookie) {
        String refreshToken = cookie.getValue();

        log.info("BACK-AUTH:REISSUE Refresh token: {}", refreshToken);

        if(!jwtTokenProvider.validateToken(refreshToken)) {
            log.error("BE/AUTH - JWT VAILD 예외 : {}" , CustomException.NOT_VALID_JWT_EXCEPTION);
            throw new ExceptionResponse(CustomException.NOT_VALID_JWT_EXCEPTION);
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(refreshToken);
        Member member = ((PrincipalDetails) authentication.getPrincipal()).getMember();

        if (!refreshTokenRepository.getByEmail(member.getEmail()).equals(refreshToken)) {
            log.error("BE/AUTH - JWT VAILD 예외 : {}" , CustomException.NOT_VALID_JWT_EXCEPTION);
            throw new ExceptionResponse(CustomException.NOT_VALID_JWT_EXCEPTION);
        }

        return jwtTokenProvider.generateToken(member);
    }
}
