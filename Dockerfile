
FROM maven:3.9.5-eclipse-temurin-21 AS build

WORKDIR /app

COPY mentor-connect/ /app

RUN chmod +x mvnw && ./mvnw -B -DskipTests clean install

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /app/target/mentor-connect-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
