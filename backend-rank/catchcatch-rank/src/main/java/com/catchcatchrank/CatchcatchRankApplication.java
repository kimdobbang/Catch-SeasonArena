package com.catchcatchrank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CatchcatchRankApplication {

	public static void main(String[] args) {
		SpringApplication.run(CatchcatchRankApplication.class, args);
	}

}
