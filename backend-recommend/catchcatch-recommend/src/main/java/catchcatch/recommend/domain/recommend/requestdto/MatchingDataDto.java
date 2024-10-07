package catchcatch.recommend.domain.recommend.requestdto;

import lombok.Builder;

@Builder
public record MatchingDataDto (
     Integer rating,
     Long entryTime,
     String dayOfWeek,
     Long matchDuration,
     Integer currentUserSize){
}