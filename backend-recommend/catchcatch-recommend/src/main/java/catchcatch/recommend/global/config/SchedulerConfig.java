package catchcatch.recommend.global.config;

import catchcatch.recommend.domain.recommend.service.RecommendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SchedulerConfig {

    private final RecommendService recommendService;

    @Async
    @Scheduled(fixedDelay = 5000)
    public void run(){
        recommendService.matchingGame();
    }
}