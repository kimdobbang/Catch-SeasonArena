package com.catchcatchrank.domains.rank.application.service;

import com.catchcatchrank.domains.member.appclication.port.GetMemberByEmailPort;
import com.catchcatchrank.domains.member.domain.Member;
import com.catchcatchrank.domains.rank.application.port.in.GetAllRankingUseCase;
import com.catchcatchrank.domains.rank.application.port.out.GetAllRankPort;
import com.catchcatchrank.domains.rank.application.port.out.GetMeRankPort;
import com.catchcatchrank.domains.rank.application.port.out.GetUserTierPort;
import com.catchcatchrank.domains.rank.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "rank")
public class GetAllRankingUseCaseImpl implements GetAllRankingUseCase {

    private final GetUserTierPort getUserTierPort;
    private final GetAllRankPort getAllRankPort;
    private final GetMeRankPort getMeRankPort;
    private final GetMemberByEmailPort getMemberByEmailPort;

    @Value("${rank.limit:5}")
    private Integer limit;

    @Override
    public MyAllRanking getMyAllRanking(String email, Integer page) {
        Integer start = page * limit;
        log.info("BE-RANK :  start {}", start);
        String tier = getUserTierPort.getUserTier(email);
        log.info("BE-RANK : tier {}", tier);
        Set<ZSetOperations.TypedTuple<Object>> tierRanksSet = getAllRankPort.getAllRank(start);
        List<UserRank> allRanks = tierRank(tierRanksSet, start);
        Member member = getMemberByEmailPort.getMemberByEmail(email);
        MyRank myRank = myRank(tier, member.getNickname());
        return new MyAllRanking(allRanks, myRank);
    }

    @Override
    public AllRanking getAllRanking(Integer page) {
        Integer start = page * limit;
        log.info("BE-RANK :  start {}", start);
        Set<ZSetOperations.TypedTuple<Object>> tierRanksSet = getAllRankPort.getAllRank(start);
        List<UserRank> allRanks = tierRank(tierRanksSet, start);
        return new AllRanking(allRanks);
    }

    private List<UserRank> tierRank(Set<ZSetOperations.TypedTuple<Object>> tierRanksSet, Integer start) {
        int count = start+1;
        List<UserRank> ranks = new ArrayList<>();
        for (ZSetOperations.TypedTuple<Object> tuple : tierRanksSet) {
            String email = tuple.getValue().toString();
            Integer rate = tuple.getScore().intValue();
            Member member = getMemberByEmailPort.getMemberByEmail(email);
            UserRank userRank = UserRank.createUserRank(member.getNickname(), member.getAvatar(), count++, rate);
            ranks.add(userRank);
        }
        return ranks;
    }

    private MyRank myRank(String tier, String nickname) {
        Integer getMyRank = getMeRankPort.getTierOfUserRaking(tier, nickname) + 1;
        Integer getMyRate = getMeRankPort.getUserRate(tier, nickname);

        return MyRank.createMyRank(tier, nickname, getMyRank, getMyRank, getMyRate);
    }
}
