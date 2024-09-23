package com.catchcatch.auth.domains.member.application.port.in;

import jakarta.servlet.http.Cookie;

public interface ReissueUseCase {

    String reissue(Cookie cookie);
}
