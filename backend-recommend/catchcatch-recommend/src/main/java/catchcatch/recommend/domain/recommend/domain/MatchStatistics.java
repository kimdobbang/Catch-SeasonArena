package catchcatch.recommend.domain.recommend.domain;

import catchcatch.recommend.domain.recommend.requestdto.MatchData;
import catchcatch.recommend.domain.recommend.requestdto.MatchingDataDto;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MatchStatistics {

    private Map<String, MatchData[][]> MATCHED_DATA;

    public MatchStatistics() {
        MATCHED_DATA = new HashMap<>();
        String[] days = {"MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"};

        for (String day : days) {
            MatchData[][] data = new MatchData[24][6];
            for (int i = 0; i < 24; i++) {
                for (int j = 0; j < 6; j++) {
                    data[i][j] = new MatchData(0, 0);
                }
            }
            MATCHED_DATA.put(day, data);
        }
    }

    public void updateMatchedData(String day, int hour, int ratingRange, int matchTime, int userSize) {
        MatchData[][] data = MATCHED_DATA.get(day);
        data[hour][ratingRange].setTime(matchTime);
        data[hour][ratingRange].setSize(userSize);
    }

    public MatchData getMatchedData(String day, int hour, int ratingRange) {
        return MATCHED_DATA.get(day)[hour][ratingRange];
    }

}
