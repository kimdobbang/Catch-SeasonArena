package com.catchcatch.main.domains.dictionary.adapter.out.persistence;

import com.catchcatch.main.domains.dictionary.domain.Dictionaries;
import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;
import com.catchcatch.main.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "dictionaries")
@Getter
public class DictionariesEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private MemberEntity member;

    @Column(name = "item_id", nullable = false)
    private Long itemId;

    @Column(name = "count", nullable = false)
    private int count;

    @Builder
    public DictionariesEntity(Long id, MemberEntity member, Long itemId, int count) {
        this.id = id;
        this.member = member;
        this.itemId = itemId;
        this.count = count;
    }

    public static DictionariesEntity fromDomain(MemberEntity member, Dictionaries dictionaries) {
        return DictionariesEntity.builder()
                .member(member)
                .itemId(dictionaries.getItemId())
                .count(dictionaries.getCount())
                .build();
    }
    public void update() {
        this.count++;
    }
}
