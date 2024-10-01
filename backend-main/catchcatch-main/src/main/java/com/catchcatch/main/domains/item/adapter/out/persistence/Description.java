package com.catchcatch.main.domains.item.adapter.out.persistence;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum Description {

    MAPLE("이것은 단풍잎이다"),
    PUMPKINS("이것은 잭오랜턴이다"),
    PINECONE("이것은 솔방울이다"),
    DRAGONFLY("이것은 잠자리다"),
    COSMOS("이것은 코스모스다"),
    BEAR("이것은 곰이다"),
    DDUGI("이것은 뚜기다"),
    MUSHROOM("이것은 버섯이다"),
    CORN("이것은 옥수수다"),
    SQUIRREL("이것은 다람쥐다"),
    MOON("이것은 달이다");

    private final String description;

    @Override
    public String toString() {
        return description;
    }
}
