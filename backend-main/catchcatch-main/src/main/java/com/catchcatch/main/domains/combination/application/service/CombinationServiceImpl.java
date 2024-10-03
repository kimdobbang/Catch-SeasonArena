package com.catchcatch.main.domains.combination.application.service;

import com.catchcatch.main.domains.combination.application.port.in.CombinationUseCase;
import com.catchcatch.main.domains.combination.application.port.out.CombiResponseDto;
import com.catchcatch.main.domains.inventory.application.port.out.DeleteInventoryPort;
import com.catchcatch.main.domains.inventory.application.port.out.FindInventoryByIdAndMemberEmailPort;
import com.catchcatch.main.domains.inventory.application.port.out.SaveInventoryPort;
import com.catchcatch.main.domains.inventory.domain.Inventory;
import com.catchcatch.main.domains.item.adapter.out.persistence.Grade;
import com.catchcatch.main.domains.item.domain.Item;
import com.catchcatch.main.domains.item.port.out.FindItemPort;
import com.catchcatch.main.domains.member.application.port.out.FindMemberPort;
import com.catchcatch.main.domains.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@Transactional
@RequiredArgsConstructor
public class CombinationServiceImpl implements CombinationUseCase {

    private final SaveInventoryPort saveInventoryPort;
    private final FindItemPort findItemPort;
    private final DeleteInventoryPort deleteInventoryPort;
    private final FindMemberPort findMemberPort;
    private final FindInventoryByIdAndMemberEmailPort findInventoryByIdAndMemberEmailPort;

    @Override
    public CombiResponseDto combiItem(String email, Long inven1, Long inven2) {
        Inventory inventory1 = findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(inven1, email);
        Inventory inventory2 = findInventoryByIdAndMemberEmailPort.findInventoryByIdAndMemberEmail(inven2, email);

        Item tem1 = findItemPort.findItemById(inventory1.getItem().getId());
        Item tem2 = findItemPort.findItemById(inventory2.getItem().getId());
        deleteInventoryPort.deleteInventory(inventory1);
        deleteInventoryPort.deleteInventory(inventory2);
        double successProbability = 0.5;

        if (Math.random() > successProbability) {
            return new CombiResponseDto("Failure", null);  // 콤비 실패 시 실패 메시지와 null 반환
        }

        Grade grade1 = tem1.getGrade();
        Grade grade2 = tem2.getGrade();
        Grade resultGrade = determineGrade(grade1, grade2);

        Long resultItemId = generateRandomItemId(resultGrade);

        Item resultItem = findItemPort.findItemById(resultItemId);

        Member member = findMemberPort.findMember(email);

        Grade itemGrade = resultItem.getGrade();
        Inventory inventory = Inventory.builder()
                .item(resultItem)
                .durability(itemGrade == Grade.NORMAL ? 5 : itemGrade == Grade.RARE ? 10 : 15)
                .member(member)
                .build();

        saveInventoryPort.saveInventory(inventory);
        return new CombiResponseDto("Success", resultItem);
    }

    private Grade determineGrade(Grade grade1, Grade grade2) {
        double randomValue = Math.random(); // 0 ~ 1 사이의 난수 생성
        Grade resultGrade = Grade.NORMAL; // 기본값은 NORMAL

        if (grade1.equals(Grade.NORMAL) && grade2.equals(Grade.NORMAL)) {
            if (randomValue <= 0.9) {
                resultGrade = Grade.NORMAL;
            } else if (randomValue <= 0.99) {
                resultGrade = Grade.RARE;
            } else {
                resultGrade = Grade.LEGEND;
            }
        } else if ((grade1.equals(Grade.NORMAL) && grade2.equals(Grade.RARE)) ||
                (grade1.equals(Grade.RARE) && grade2.equals(Grade.NORMAL))) {
            if (randomValue <= 0.8) {
                resultGrade = Grade.NORMAL;
            } else if (randomValue <= 0.98) {
                resultGrade = Grade.RARE;
            } else {
                resultGrade = Grade.LEGEND;
            }
        } else if (grade1.equals(Grade.RARE) && grade2.equals(Grade.RARE)) {
            if (randomValue <= 0.5) {
                resultGrade = Grade.NORMAL;
            } else if (randomValue <= 0.9) {
                resultGrade = Grade.RARE;
            } else {
                resultGrade = Grade.LEGEND;
            }
        } else if ((grade1.equals(Grade.LEGEND) && grade2.equals(Grade.RARE)) ||
                (grade1.equals(Grade.RARE) && grade2.equals(Grade.LEGEND))) {
            if (randomValue <= 0.2) {
                resultGrade = Grade.NORMAL;
            } else if (randomValue <= 0.8) {
                resultGrade = Grade.RARE;
            } else {
                resultGrade = Grade.LEGEND;
            }
        } else if (grade1.equals(Grade.LEGEND) && grade2.equals(Grade.LEGEND)) {
            if (randomValue <= 0.1) {
                resultGrade = Grade.NORMAL;
            } else if (randomValue <= 0.7) {
                resultGrade = Grade.RARE;
            } else {
                resultGrade = Grade.LEGEND;
            }
        }

        return resultGrade;
    }

    private Long generateRandomItemId(Grade grade) {
        Random random = new Random();
        int itemId = 1;

        if (grade.equals(Grade.NORMAL)) {
            itemId = random.nextInt(4) + 1;  // 1~4 범위에서 랜덤 ID 생성
        } else if (grade.equals(Grade.RARE)) {
            itemId = random.nextInt(4) + 5;  // 5~8 범위에서 랜덤 ID 생성
        } else if (grade.equals(Grade.LEGEND)) {
            itemId = random.nextInt(4) + 9;  // 9~12 범위에서 랜덤 ID 생성
        }

        return (long) itemId;
    }
}
