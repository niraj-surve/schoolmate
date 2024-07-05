# Stage 1: Build stage (uses maven)
FROM maven:3.8.5-openjdk-17 AS builder

# Copy your project directory (replace 'your-project-dir' with your actual path)
COPY . .

# Update the following command to build your Spring Boot application (replace 'mvn package' with your specific command)
RUN mvn clean package -DskipTests

# Stage 2: Runtime stage (slim OpenJDK image)
FROM openjdk:17.0.1-jdk-slim

# Copy the JAR file from the build stage
COPY --from=builder /target/*.jar schoolmateapi.jar

EXPOSE 8080

# Executable jar (adjust path if needed)
ENTRYPOINT ["java", "-jar", "schoolmateapi.jar"]
