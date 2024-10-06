package com.catchcatchrank.domains.member.appclication.port;

import com.catchcatchrank.domains.member.adapter.out.persistence.MemberEntity;import com.catchcatchrank.domains.member.domain.Member;

public interface GetMemberByNickNamePort {

	Member getMemberByNickName(String nickName);
}
