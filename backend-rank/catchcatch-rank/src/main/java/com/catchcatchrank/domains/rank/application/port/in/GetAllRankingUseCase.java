package com.catchcatchrank.domains.rank.application.port.in;

import com.catchcatchrank.domains.rank.domain.AllRanking;
import com.catchcatchrank.domains.rank.domain.MyAllRanking;

public interface GetAllRankingUseCase {

    MyAllRanking getMyAllRanking(String nickname, Integer page);
    AllRanking getAllRanking(Integer page);
}
