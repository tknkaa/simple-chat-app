dev:
	npm run dev

start-database:
	docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo

end-database:
	docker-compose down

format:
	npx prettier . --write

setup:
	cd frontend && npm install && cd ../backend && npm install