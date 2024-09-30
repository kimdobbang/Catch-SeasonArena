package com.catchcatch.main.domains.test;

import lombok.Getter;

@Getter
public class TestRequestDto {

	private String email;
	private TestDetectDto detectResult;

	@Override
	public String toString() {
		return "TestRequestDto{" +
			"email='" + email + '\'' +
			", testDetectDto=" + detectResult.toString() +
			'}';
	}
}
