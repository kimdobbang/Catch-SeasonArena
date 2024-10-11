package com.catchcatchrank.domains.rank;

import static org.mockito.ArgumentMatchers.*;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

import com.catchcatchrank.domains.rank.adapter.in.kafka.KafkaUpdateRankEntity;
import com.catchcatchrank.domains.rank.application.port.out.GetRatePort;
import com.catchcatchrank.domains.rank.application.port.out.UpdateTierPort;
import com.catchcatchrank.domains.rank.application.service.UpdateRankUseCaseImpl;
import com.catchcatchrank.domains.rank.domain.Rank;

@ExtendWith(MockitoExtension.class)
public class UpdateRankUseCaseTest {

	@InjectMocks
	private UpdateRankUseCaseImpl updateRankService;

	@Mock
	private UpdateTierPort updateTierPort;

	@Mock
	private GetRatePort getRatePort;

	@Mock
	private ApplicationEventPublisher eventPublisher;

	private KafkaUpdateRankEntity kafkaUpdateRankEntity;
	private Rank rank;

	@BeforeEach
	public void init() {
		kafkaUpdateRankEntity = new KafkaUpdateRankEntity("1" , 1 , 1 , 1 , 1);
		rank = new Rank(kafkaUpdateRankEntity.getEmail(), 1);
	}

	@Test
	@DisplayName("랭크 업데이트")
	public void 랭크_업데이트_테스트 () {
		//given
		BDDMockito.given(getRatePort.getRate(kafkaUpdateRankEntity.getEmail())).willReturn(1);
		BDDMockito.doNothing().when(updateTierPort).updateTierRank(any(Rank.class));


		//when then
		Assertions.assertThatNoException().isThrownBy(() -> updateRankService.updateRank(kafkaUpdateRankEntity));
	}


}
