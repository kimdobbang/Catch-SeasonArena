package catchcatch.recommend.domain.recommend.requestdto;

public record EntryRequestDto(
        String nickname,
        Integer rating,
        Integer[] items,
        String avatar
) {
}
