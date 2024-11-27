dev-frontend:
	cd frontend && npm run start

dev-backend:
	cd backend && npx tsc && node dist/server.js

format:
	npx prettier . --write
