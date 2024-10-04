package catchcatch.recommend.global.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class CorsMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("*")
                .exposedHeaders("Authorization", "Set-Cookie")
                .allowedOrigins("https://j11b106.p.ssafy.io", "http://localhost:3000", "http://localhost:5500")
                .allowCredentials(true);
    }
}
