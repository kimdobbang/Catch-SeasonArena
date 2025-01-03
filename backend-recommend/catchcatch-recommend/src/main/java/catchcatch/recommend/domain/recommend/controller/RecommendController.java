package catchcatch.recommend.domain.recommend.controller;

import catchcatch.recommend.domain.recommend.domain.Player;
import catchcatch.recommend.domain.recommend.requestdto.EntryRequestDto;
import catchcatch.recommend.domain.recommend.requestdto.ExitRequestDto;
import catchcatch.recommend.domain.recommend.service.RecommendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;

@RestController
@RequiredArgsConstructor
@Slf4j(topic = "matching")
public class RecommendController {

    private final RecommendService recommendService;

    @MessageMapping("/entry")
    public void entryPlayer(EntryRequestDto requestDto) throws Exception{
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        String dayOfWeek = now.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.KOREAN);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDate = now.format(formatter);

        log.info("BACK/MATCHING - entry player time: {}, rating: {}, day: {}", formattedDate, requestDto.rating(), dayOfWeek);
        recommendService.entryPlayer(requestDto);
    }

    @MessageMapping("/exit")
    public void exitPlayer(ExitRequestDto requestDto) {
        log.info("BACK-RECOMMEND/ exit player: {}", requestDto);
        recommendService.exitPlayerByNickname(requestDto);
    }

    @MessageMapping("/remove")
    public void removePlayer(){
        recommendService.removeAllPlayers();
    }
}
