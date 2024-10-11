package com.catchcatch.main.domains.item.adapter.out.persistence;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum Effect {

    MAPLE("사거리가 30% 증가합니다."),
    PUMPKINS("피해량이 20% 감소하고, 캐릭터가 잭 오 랜턴으로 변신합니다."),
    PINECONE("3초 후 폭발하는 데미지 30의 폭탄을 설치합니다."),
    DRAGONFLY("자기장 내 랜덤 위치로 순간 이동합니다."),
    COSMOS("넉백 파워가 100% 증가합니다."),
    BEAR("체력이 100% 증가하며, 크기가 30% 커집니다."),
    DDUGI("전방에 데미지 20의 강력한 대쉬공격을 사용합니다."),
    MUSHROOM("데미지 20의 원형 공격을 사용합니다."),
    CORN("넉백 파워가 50% 증가하며, 맞은 적을 일정 시간 기절시킵니다."),
    SQUIRREL("이동속도가 30% 증가합니다."),
    MOON("시전 시 2초간 주문을 외우며 모든 유저에게 데미지 10의 번개 공격을 사용합니다."),
    SCARECROW("허수아비로 변신하여 2초간 무적이 됩니다.");

    private final String effect;

    @Override
    public String toString() {
        return effect;
    }
}
