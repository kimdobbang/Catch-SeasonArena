package catchcatch.recommend.domain.recommend.domain;

import catchcatch.recommend.domain.recommend.requestdto.EntryRequestDto;
import lombok.*;

import java.util.Objects;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Player implements Comparable<Player>{

    private String nickname;
    private Integer rating;
    private Integer[] items;
    private String avatar;
    private Long entryTime;

    @Builder
    private Player(String nickname, Integer rating, Integer[] items, String avatar) {
        this.nickname = nickname;
        this.rating = rating;
        this.items = items;
        this.avatar = avatar;
        this.entryTime = System.currentTimeMillis();
    }

    public static Player createPlayer(EntryRequestDto requestDto) {
        return Player.builder()
                .nickname(requestDto.nickname())
                .rating(requestDto.rating())
                .items(requestDto.items())
                .avatar(requestDto.avatar())
                .build();
    }

    public void extendRating(Integer rating) {
        this.rating += rating;
    }

    public static Player createRangePlayer(Integer rating) {
        return Player.builder()
                .rating(rating)
                .build();
    }

    @Override
    public int compareTo(Player other) {
        int ratingComparison = Integer.compare(this.rating, other.rating);
        if (ratingComparison != 0) {
            return ratingComparison;
        }
        return this.nickname.compareTo(other.nickname);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Player)) return false;
        Player player = (Player) o;
        return Objects.equals(nickname, player.nickname);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nickname);
    }

}
