# Stage 1: Build the JAR
FROM maven:3.9 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/simplenote-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your application will run on
EXPOSE 8080

# Define the command to run your application
CMD ["java", "-jar", "app.jar"]