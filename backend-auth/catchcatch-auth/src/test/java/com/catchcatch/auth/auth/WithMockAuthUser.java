package com.catchcatch.auth.auth;

import com.catchcatch.auth.domains.member.domain.Role;
import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockSecurityContext.class)
public @interface WithMockAuthUser {
    String email();
    Role role() default Role.ROLE_USER;
}
