# Pre-requisite Installation
- Java 17+ or 21+
- Maven
- Node , npm 


# Terminal 1 — start Spring Boot (H2 spins up automatically)
cd backend
./mvnw spring-boot:run

# Terminal 2 — start React
cd project-management
npm run dev

# Visit http://localhost:5173
Browse H2 console at http://localhost:8080/h2-console  #OR VMIP
JDBC URL: jdbc:h2:mem:projectmgmt  |  User: admin  |  Password: password

# Node Version fix
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 20
nvm use 20
nvm alias default 20
rm -rf node_modules package-lock.json  
npm install
npm run dev
