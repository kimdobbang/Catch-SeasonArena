package com.catchcatch.main.domains.member.application.port.out;

public interface ExistsMemberPort {

    Boolean existsMemberByNickname(String nickname, Boolean isDeleted);
}
