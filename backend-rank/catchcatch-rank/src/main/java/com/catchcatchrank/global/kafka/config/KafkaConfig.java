package com.catchcatchrank.global.kafka.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

import com.catchcatchrank.domains.rank.adapter.out.kafka.KafkaRankEntity;
import com.catchcatchrank.domains.rank.adapter.out.kafka.KafkaUpdateRankEntity;

import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;


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
	public ProducerFactory<String, KafkaUpdateRankEntity> producerFactory() {
		Map<String, Object> config = new HashMap<>();
		config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
		config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
		config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);

		return new DefaultKafkaProducerFactory<>(config);
	}

	@Bean
	public KafkaTemplate<String, KafkaUpdateRankEntity> kafkaTemplate() {
		return new KafkaTemplate<>(producerFactory());
	}

	@Bean
	public ConsumerFactory<String, KafkaRankEntity> consumerFactory() {
		Map<String, Object> config = new HashMap<>();
		config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
		config.put(ConsumerConfig.GROUP_ID_CONFIG, consumerGroupId);
		config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
		config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
		config.put(JsonDeserializer.TRUSTED_PACKAGES, "*");

		JsonDeserializer<KafkaRankEntity> deserializer = new JsonDeserializer<>(KafkaRankEntity.class, false);
		config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, deserializer);

		return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), deserializer);
	}

	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, KafkaRankEntity> kafkaListenerContainerFactory() {
		ConcurrentKafkaListenerContainerFactory<String, KafkaRankEntity> factory = new ConcurrentKafkaListenerContainerFactory<>();
		factory.setConsumerFactory(consumerFactory());

		return factory;
	}


	@Bean
	public ConsumerFactory<String, KafkaUpdateRankEntity> consumerUpdateRankFactory() {
		Map<String, Object> config = new HashMap<>();
		config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
		config.put(ConsumerConfig.GROUP_ID_CONFIG, consumerGroupId);
		config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
		config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
		config.put(JsonDeserializer.TRUSTED_PACKAGES, "*");

		JsonDeserializer<KafkaUpdateRankEntity> deserializer = new JsonDeserializer<>(KafkaUpdateRankEntity.class, false);
		config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, deserializer);

		return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), deserializer);
	}

	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, KafkaUpdateRankEntity> kafkaUpdateRankListenerContainerFactory() {
		ConcurrentKafkaListenerContainerFactory<String, KafkaUpdateRankEntity> factory = new ConcurrentKafkaListenerContainerFactory<>();
		factory.setConsumerFactory(consumerUpdateRankFactory());

		return factory;
	}
}
