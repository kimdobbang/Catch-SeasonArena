package catchcatch.recommend.domain.recommend.service;

import catchcatch.recommend.domain.recommend.domain.Player;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.concurrent.ConcurrentSkipListSet;

@Component
@Getter
public class PlayerStore {

    private  ConcurrentSkipListSet<Player> waitingPlayers;

    public PlayerStore() {
        this.waitingPlayers = new ConcurrentSkipListSet<>(
                Comparator.comparingInt(Player::getRating)
                        .thenComparing(Player::getNickname));
    }
}
