package com.catchcatch.main.domains.test;

import lombok.Getter;

@Getter
public class TestDetectDto {
	private String file_name;
	private String xmin;
	private String ymin;
	private String xmax;
	private String ymax;
	private String confidence;
	private String itemId;

	@Override
	public String toString() {
		return "TestDetectDto{" +
			"file_name='" + file_name + '\'' +
			", xmin='" + xmin + '\'' +
			", ymin='" + ymin + '\'' +
			", xmax='" + xmax + '\'' +
			", ymax='" + ymax + '\'' +
			", confidence='" + confidence + '\'' +
			", itemId='" + itemId + '\'' +
			'}';
	}
}
