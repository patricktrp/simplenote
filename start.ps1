docker compose -f "./backend/docker-compose.yml" --env-file "./backend/.env" up -d --build 
npm run dev --prefix ./frontend