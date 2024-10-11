package com.catchcatch.auth.auth;

import com.catchcatch.auth.domains.member.adapter.in.web.requestdto.SignUpRequestDto;
import com.catchcatch.auth.domains.member.domain.Member;
import com.catchcatch.auth.global.security.auth.PrincipalDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

public class WithMockSecurityContext implements WithSecurityContextFactory<WithMockAuthUser> {

    @Override
    public SecurityContext createSecurityContext(WithMockAuthUser mockAuthUser) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        Member member = Member.createSignUpMember(new SignUpRequestDto("email@ssafy.com", "1234"));
        PrincipalDetails memberDetails = new PrincipalDetails(member);
        Authentication auth = new UsernamePasswordAuthenticationToken(memberDetails, null, memberDetails.getAuthorities());
        context.setAuthentication(auth);
        return context;
    }
}
