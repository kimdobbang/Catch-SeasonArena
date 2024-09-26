package com.catchcatchrank.domains.member.appclication.port;

import com.catchcatchrank.domains.member.adapter.out.persistence.MemberEntity;

public interface GetMemberByNickNamePort {

	MemberEntity getMemberByNickName(String nickName);
}
