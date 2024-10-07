package com.catchcatchrank.domains.member.appclication.port;

import com.catchcatchrank.domains.member.domain.Member;

public interface GetMemberByEmailPort {

	Member getMemberByEmail(String email);
}
