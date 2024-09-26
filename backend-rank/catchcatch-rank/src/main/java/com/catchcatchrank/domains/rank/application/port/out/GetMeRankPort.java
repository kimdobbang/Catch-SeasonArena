package com.catchcatchrank.domains.rank.application.port.out;

public interface GetMeRankPort {
	Integer getTierOfUserRaking(String tier, String nickname);
	Integer getUserRate(String tier, String nickname);
}