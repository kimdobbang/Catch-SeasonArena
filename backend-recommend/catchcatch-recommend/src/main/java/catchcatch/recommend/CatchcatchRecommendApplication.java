package catchcatch.recommend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class CatchcatchRecommendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CatchcatchRecommendApplication.class, args);
	}

}
