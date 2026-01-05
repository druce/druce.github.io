#!/bin/zsh

# Pizza app local development launcher
# Activates uv virtual environment and runs Flask app

# Change to script directory
cd "$(dirname "$0")"

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "Creating uv virtual environment..."
    uv venv
fi

# Activate uv virtual environment
source .venv/bin/activate

# Install/update dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "Installing dependencies with uv..."
    uv pip install -r requirements.txt
fi

# Check if required files exist
if [ ! -f "pizza.py" ]; then
    echo "Error: pizza.py not found. Copy from source directory."
    exit 1
fi

if [ ! -d "secrets" ]; then
    echo "Error: secrets/ directory not found. API keys are required."
    echo "Copy secrets/ from: /Users/drucev/projects/maps/Pizza/Pizza/secrets/"
    exit 1
fi

if [ ! -d "cache" ]; then
    echo "Warning: cache/ directory not found. Will create on first run."
fi

# Launch Flask app
echo "Starting Pizza app on http://0.0.0.0:8181"
python app.py
