package com.catchcatch.main.domains.item.adapter.out.persistence;

import net.logstash.logback.appender.listener.FailureSummaryLoggingAppenderListener;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum Season {
	SPRING,
	SUMMER,
	AUTUMN,
	WINTER
}
