# Use the official Golang image as the builder
FROM golang:1.23-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files for dependency management
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the Go application
RUN go build -o myapp main.go

# Use a minimal image to run the Go application
FROM alpine:latest

# Set the working directory
WORKDIR /root/

# Create a directory for the PDF files
RUN mkdir -p /root/files

# Copy the PDF files into the container
COPY ./files/parte1.pdf ./files/parte2.pdf ./files/parte3.pdf /root/files/

# Copy the compiled binary from the builder stage
COPY --from=builder /app/myapp .

# Expose the port that your application will listen on
EXPOSE 8088

# Command to run the executable
CMD ["./myapp"]
