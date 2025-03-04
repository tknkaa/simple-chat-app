dev:
	npm run dev

start-database:
	docker-compose up -d

end-database:
	docker-compose down

format:
	npx prettier . --write

setup:
	cd frontend && npm install && cd ../backend && npm install