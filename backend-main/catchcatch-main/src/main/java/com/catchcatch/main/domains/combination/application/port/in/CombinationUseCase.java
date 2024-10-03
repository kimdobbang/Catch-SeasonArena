package com.catchcatch.main.domains.combination.application.port.in;

import com.catchcatch.main.domains.combination.application.port.out.CombiResponseDto;

public interface CombinationUseCase {
    CombiResponseDto combiItem(String email, Long item1, Long item2);
}
