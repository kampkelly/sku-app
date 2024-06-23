# Command to start the development server for Next.js
install-nextjs:
	@echo "Starting Next.js development server..."
	cd sku-client && npm install

start-nextjs:
	@echo "Starting Next.js development server..."
	cd sku-client && npm run dev

# Command to build the Next.js project for production
build-nextjs:
	@echo "Building Next.js project for production..."
	cd sku-client && npm run build

# Command to run tests for Next.js
test-nextjs:
	@echo "Running Next.js tests..."
	cd sku-client && npm test

# Command to start the production server for Django
start-django:
	@echo "Starting Django production server..."
	cd sku-server/sku_app && python manage.py runserver

# Command to create Django migrations
make-migrations-django:
	@echo "Creating Django migrations..."
	cd sku-server/sku_app && python manage.py makemigrations

# Command to apply Django migrations
migrate-django:
	@echo "Applying Django migrations..."
	cd sku-server/sku_app && python manage.py migrate

# Command to revert the last Django migration
revert-migration-django:
	@echo "Reverting the last Django migration..."
	cd sku-server/sku_app && python manage.py migrate --noinput app_name zero

# Command to run Django tests
test-django:
	@echo "Running Django tests..."
	cd sku-server/sku_app && python manage.py test api_v1.tests

# Command to install Django dependencies
install-dependencies-django:
	@echo "Installing Django dependencies..."
	cd sku-server && pip install -r requirements.txt

# Help command to display available commands
help:
	@echo "Available commands:"
	@echo "  make start-nextjs   - Start the development server for Next.js"
	@echo "  make build-nextjs   - Build the Next.js project for production"
	@echo "  make test-nextjs    - Run tests for Next.js"
	@echo "  make start-django   - Start the production server for Django"
	@echo "  make make-migrations-django   - Create Django migrations"
	@echo "  make migrate-django   - Apply Django migrations"
	@echo "  make revert-migration-django   - Revert the last Django migration"
	@echo "  make test-django   - Run Django tests"
	@echo "  make install-dependencies-django   - Install Django dependencies"
	@echo "  make help           - Display this help message"

