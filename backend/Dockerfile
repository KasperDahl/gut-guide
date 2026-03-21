# ---- Build stage ----
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Download dependencies first (layer caching)
RUN ./gradlew dependencies --no-daemon

COPY src ./src

RUN ./gradlew build -x test --no-daemon

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre

WORKDIR /app

# Run as non-root user
RUN groupadd --system appgroup && useradd --system --gid appgroup appuser

COPY --from=build /app/build/libs/backend-0.0.1.jar app.jar

RUN chown appuser:appgroup app.jar
USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
