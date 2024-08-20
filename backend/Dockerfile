# Use an official OpenJDK 17 image as the base image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Gradle build files
COPY build.gradle gradlew settings.gradle ./

# Copy the source code
COPY src ./src

# Copy the Gradle wrapper and gradle directory
COPY gradlew ./
COPY gradle ./gradle

# Build the application (skips tests)
RUN ./gradlew build -x test

# Expose the port that the Spring Boot app runs on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT [ "java", "-jar", "build/libs/backend-0.0.1-SNAPSHOT.jar" ]



