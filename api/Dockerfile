# Dockerfile References: https://docs.docker.com/engine/reference/builder/

# Start from the latest golang base image
FROM golang:1.13.1

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download
RUN go get github.com/pilu/fresh

RUN apt-get update -qq && \
  apt-get install -y mariadb-client vim

# Copy the source from the current directory to the Working Directory inside the container
COPY . .
