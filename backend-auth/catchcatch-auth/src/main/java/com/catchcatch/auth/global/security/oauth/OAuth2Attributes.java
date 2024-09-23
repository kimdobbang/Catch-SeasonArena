package com.catchcatch.auth.global.security.oauth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Getter
@AllArgsConstructor
@Slf4j
public class OAuth2Attributes {

    private String email;
    private Map<String, Object> attributes;

    public static OAuth2Attributes of(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equals("kakao"))
            return ofKakao(attributes);

        return ofGoogle(attributes);
    }

    private static OAuth2Attributes ofKakao(Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");

        log.info("BACK-AUTH:KAKAO-OAUTH-LOGIN email-{}", kakaoAccount.get("email").toString());

        return new OAuth2Attributes(
                kakaoAccount.get("email").toString(),
                kakaoAccount
        );

    }

    private static OAuth2Attributes ofGoogle(Map<String, Object> attributes) {

        log.info("BACK-AUTH:GOOGLE-OAUTH-LOGIN email-{}", attributes.get("email").toString());

        return new OAuth2Attributes(
                attributes.get("email").toString(),
                attributes
        );
    }
}
