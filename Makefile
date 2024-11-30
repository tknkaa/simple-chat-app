dev-frontend:
	cd frontend && npm run start

dev-backend:
	cd backend && npx tsc && node dist/server.js

start-database:
	docker-compose up -d

end-database:
	docker-compose down

format:
	npx prettier . --write

setup-frontend:
	cd frontend && npm install

setup-backend:
	cd backend && npm install