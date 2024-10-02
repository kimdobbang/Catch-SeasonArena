package com.catchcatch.main.domains.dictionary.adapter.out.persistence;

import com.catchcatch.main.domains.member.adapter.out.persistence.MemberEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "dictionaries")
@Getter
public class DictionariesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private MemberEntity member;

    @Column(name = "item_id", nullable = false)
    private Long itemId;

    @Column(name = "createdAt", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "modifiedAt", nullable = false)
    private LocalDateTime modifiedAt;

    @Column(name = "count", nullable = false)
    private int count;

}
