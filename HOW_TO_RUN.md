Dang dung tool nay de quan ly prisma
@nx-tools/nx-prisma

1. Tao env
```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/beeat_db"

# Supabase
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Server
HOST="localhost"
PORT=3000
NODE_ENV="development"

# Set to "production" to disable Swagger documentation
# NODE_ENV="production"
```
2. Run generate schema
```
npx nx prisma-generate @packages/prisma
```
3. RUN API
```
npx nx serve apis
```


4. Nếu em dùng database ở localhost, thì phải migrate hoặc db push
```
npx nx prisma-push @packages/prisma --name=dev
```

```
npx nx prisma-migrate @packages/prisma --name=prod
```