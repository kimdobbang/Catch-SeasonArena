package com.catchcatchrank.domains.rank.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MyRank {

    private String tier;
    private String nickname;
    private Integer totalRanking;
    private Integer tierRanking;
    private Integer rating;

    @Builder
    private MyRank(String tier, String nickname, Integer totalRanking, Integer tierRanking, Integer rating) {
        this.tier = tier;
        this.nickname = nickname;
        this.totalRanking = totalRanking;
        this.tierRanking = tierRanking;
        this.rating = rating;
    }

    public static MyRank createMyRank(String tier, String nickname, Integer totalRanking, Integer tierRanking, Integer rating) {
        return MyRank.builder()
                .tier(tier)
                .nickname(nickname)
                .totalRanking(totalRanking)
                .tierRanking(tierRanking)
                .rating(rating)
                .build();
    }
}
