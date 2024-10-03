package com.catchcatch.main.global.kafka.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;

import org.springframework.kafka.support.serializer.JsonDeserializer;

import com.catchcatch.main.domains.inventory.adapter.in.kafka.KafkaInventoryEntity;
import com.catchcatch.main.domains.inventory.adapter.in.kafka.KafkaSaveInventoryEntity;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableKafka
public class KafkaConfig {

	@Value("${spring.kafka.producer.bootstrap-servers}")
	private String bootstrapServers;

	@Value("${spring.kafka.consumer.group-id}")
	private String consumerGroupId;

	@Bean
	public ConsumerFactory<String, KafkaInventoryEntity> consumerFactory() {
		Map<String, Object> config = new HashMap<>();
		config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
		config.put(ConsumerConfig.GROUP_ID_CONFIG, consumerGroupId);
		config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
		config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
		config.put(JsonDeserializer.TRUSTED_PACKAGES, "*");

		JsonDeserializer<KafkaInventoryEntity> deserializer = new JsonDeserializer<>(KafkaInventoryEntity.class, false);
		config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, deserializer);

		return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), deserializer);
	}

	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, KafkaInventoryEntity> kafkaListenerContainerFactory() {
		ConcurrentKafkaListenerContainerFactory<String, KafkaInventoryEntity> factory = new ConcurrentKafkaListenerContainerFactory<>();
		factory.setConsumerFactory(consumerFactory());

		return factory;
	}

	@Bean
	public ConsumerFactory<String, KafkaSaveInventoryEntity> consumerUpdateRankFactory() {
		Map<String, Object> config = new HashMap<>();
		config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
		config.put(ConsumerConfig.GROUP_ID_CONFIG, consumerGroupId);
		config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
		config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
		config.put(JsonDeserializer.TRUSTED_PACKAGES, "*");

		JsonDeserializer<KafkaSaveInventoryEntity> deserializer = new JsonDeserializer<>(KafkaSaveInventoryEntity.class, false);
		config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, deserializer);

		return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), deserializer);
	}

	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, KafkaSaveInventoryEntity> kafkaSaveInventoryListenerContainerFactory() {
		ConcurrentKafkaListenerContainerFactory<String, KafkaSaveInventoryEntity> factory = new ConcurrentKafkaListenerContainerFactory<>();
		factory.setConsumerFactory(consumerUpdateRankFactory());

		return factory;
	}
}
