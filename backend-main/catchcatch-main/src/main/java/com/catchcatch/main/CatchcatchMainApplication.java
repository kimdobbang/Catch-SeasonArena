package com.catchcatch.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CatchcatchMainApplication {

	public static void main(String[] args) {
		SpringApplication.run(CatchcatchMainApplication.class, args);
	}

}
