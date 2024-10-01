package com.catchcatch.main.domains.item.adapter.out.persistence;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum Effect {

    MAPLE("이것은 단풍잎스킬이다"),
    PUMPKINS("이것은 잭오랜턴스킬이다"),
    PINECONE("이것은 솔방울스킬이다"),
    DRAGONFLY("이것은 잠자리스킬이다"),
    COSMOS("이것은 코스모스스킬이다"),
    BEAR("이것은 곰스킬이다"),
    DDUGI("이것은 뚜기스킬이다"),
    MUSHROOM("이것은 버섯스킬이다"),
    CORN("이것은 옥수수스킬이다"),
    SQUIRREL("이것은 다람쥐스킬이다"),
    MOON("이것은 달스킬이다");

    private final String effect;

    @Override
    public String toString() {
        return effect;
    }
}
