FROM openjdk:17-alpine
ARG JAR_FILE=/build/libs/auth-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
COPY src/main/resources/application.properties /app/application.properties
COPY src/main/resources/logback.xml /app/logback.xml
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
