package com.catchcatch.auth.global.security.oauth;

import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.SignUpRequestDto;
import com.catchcatch.auth.domains.member.application.port.out.ExistsMemberPort;
import com.catchcatch.auth.domains.member.application.port.out.LoadMemberPort;
import com.catchcatch.auth.domains.member.application.port.out.SaveMemberPort;
import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class OAuth2Service implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final LoadMemberPort loadMemberPort;
    private final ExistsMemberPort existsMemberPort;
    private final SaveMemberPort saveMemberPort;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        OAuth2Attributes oAuth2Attributes = OAuth2Attributes.of(registrationId, attributes);

        if(!existsMemberPort.existsByEmailAndIsDeleted(oAuth2Attributes.getEmail(), false)){
            signUpOAuthMember(oAuth2Attributes);
        }

        Member member = loadMemberPort.loadByEmailAndIsDeleted(oAuth2Attributes.getEmail(), false);

        return new PrincipalDetails(member, oAuth2User.getAttributes());
    }

    private void signUpOAuthMember(OAuth2Attributes oAuth2Attributes) {
        String randomPassword = UUID.randomUUID().toString();
        Member member = Member.createSignUpMember(
                new SignUpRequestDto(
                        oAuth2Attributes.getEmail(),
                        passwordEncoder.encode(randomPassword)
                )
        );
        saveMemberPort.save(member);
    }
}
