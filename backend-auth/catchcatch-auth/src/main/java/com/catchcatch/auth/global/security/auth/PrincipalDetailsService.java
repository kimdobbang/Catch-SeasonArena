package com.catchcatch.auth.global.security.auth;

import com.catchcatch.auth.domains.member.application.port.out.LoadMemberPort;
import com.catchcatch.auth.domains.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrincipalDetailsService implements UserDetailsService {

    private final LoadMemberPort loadMemberPort;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = loadMemberPort.loadByEmailAndIsDeleted(email, false);
        return new PrincipalDetails(member);
    }
}
