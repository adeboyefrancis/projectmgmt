
# Use a single shell for the entire recipe to allow 'source' to work
.ONESHELL:
SHELL := /bin/bash


.PHONY: all help update-package install-build-tools install-front-end-tools docker-install verify-tools

all: help update-package install-build-tools install-front-end-tools docker-install verify-tools

# Default target
help: ## Show available commands
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

update-package: ## Update and upgrade package manager
	@echo "==> Updating and Upgrading Package Manager..."
	sudo apt update && sudo apt upgrade -y

#### Back End Build Tools Installation ####

install-build-tools: ## Install Java 21, Maven, and Utility tools (curl, zip, unzip)
	@echo "==> Installing Java 21..."
	sudo apt install -y openjdk-21-jdk

	@echo "==> Installing Utility tools..."
	@if ! sudo apt install -y curl zip unzip; then \
		sudo apt install -y curl; \
		sudo apt install -y zip; \
		sudo apt install -y unzip; \
	else \
		echo "All Utility tools are already installed. Skipping."; \
	fi

	@echo "==> Installing Maven..."
	sudo apt install maven -y

#### Front End Build Tools Installation ###
install-front-end-tools:
	@echo "==> Installing Node.js and npm..."
	sudo apt install -y nodejs npm

### Docker Installation ###
docker-install: ## Docker Installation
	@echo "1. Adding Docker GPG Key..."
	sudo apt update -y
	sudo apt install -y ca-certificates curl
	sudo install -m 0755 -d /etc/apt/keyrings
	sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
	sudo chmod a+r /etc/apt/keyrings/docker.asc

	@echo "2. Adding Repository..."
	echo "deb [arch=$$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $$(. /etc/os-release && echo "$${VERSION_CODENAME}") stable" | \
	sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

	@echo "3. Installing Docker Engines..."
	sudo apt update -y
	sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

	@echo "4. Enabling and Starting Services..."
	sudo systemctl enable docker
	sudo systemctl start docker

	@echo "5. Running Post-Installation (User Groups)..."
	sudo groupadd docker || true
	sudo usermod -aG docker $(USER)
	newgrp docker
	@echo "Done! NOTE: Run 'newgrp docker' or log out/in to use Docker without sudo."

verify-tools: ## Verify Installations
	@echo "==> Verifying Installations..."
	@java -version
	@mvn -version
	@node --version
	@npm --version
	@docker --version
