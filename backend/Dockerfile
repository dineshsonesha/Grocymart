# Use official Java runtime as base
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Build the application
RUN ./mvnw clean package -DskipTests

# Run the jar
CMD ["java", "-Dserver.port=$PORT", "-jar", "target/*.jar"]
