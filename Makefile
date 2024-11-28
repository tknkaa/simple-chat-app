dev-frontend:
	cd frontend && npm run start

dev-backend:
	cd backend && npx tsc && node dist/server.js

start-database:
	sudo systemctl start mongod

end-database:
	sudo systemctl stop mongod

format:
	npx prettier . --write

setup-frontend:
	cd frontend && npm install

setup-backend:
	cd backend && npm install