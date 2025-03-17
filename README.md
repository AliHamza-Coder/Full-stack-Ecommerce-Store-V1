# Full-stack-Ecommerce-Store-V1

#which is created by next directus postgresql

here is .env file data

HOST="0.0.0.0"
PORT=8055
PUBLIC_URL="/"
LOG_LEVEL="info"
LOG_STYLE="pretty"
MAX_PAYLOAD_SIZE="1mb"
ROOT_REDIRECT="./admin"
SERVE_APP=true
GRAPHQL_INTROSPECTION=true
QUERY_LIMIT_DEFAULT=100
QUERY_LIMIT_MAX=Infinity
MAX_BATCH_MUTATION="Infinity"
REDIS="redis://@127.0.0.1:6379"

DB_CLIENT="pg"
DB_HOST="127.0.0.1"
DB_PORT="5432"
DB_DATABASE="forsale"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_SSL="false"

RATE_LIMITER_ENABLED=false
RATE_LIMITER_STORE=memory
RATE_LIMITER_POINTS=25
RATE_LIMITER_DURATION=1

CACHE_ENABLED=false
CACHE_TTL="30m"
CACHE_NAMESPACE="system-cache"
CACHE_AUTO_PURGE=true
CACHE_AUTO_PURGE_IGNORE_LIST="directus_activity,directus_presets"
CACHE_STORE=memory
ASSETS_CACHE_TTL="30d"

STORAGE_LOCATIONS="local"
STORAGE_LOCAL_DRIVER="local"
STORAGE_LOCAL_ROOT="./uploads"

SECRET="1XjevpSoJ5GXn23sdoY0A_vHIezNEOOv"
ACCESS_TOKEN_TTL="15m"
REFRESH_TOKEN_TTL="7d"
REFRESH_TOKEN_COOKIE_SECURE=false
REFRESH_TOKEN_COOKIE_SAME_SITE="lax"
REFRESH_TOKEN_COOKIE_NAME="directus_refresh_token"
SESSION_COOKIE_TTL="1d"
SESSION_COOKIE_SECURE=false
SESSION_COOKIE_SAME_SITE="lax"
SESSION_COOKIE_NAME="directus_session_token"
LOGIN_STALL_TIME=500
CORS_ENABLED=true
CORS_ORIGIN=true
CORS_METHODS=GET,POST,PATCH,DELETE
CORS_ALLOWED_HEADERS=Content-Type,Authorization
CORS_EXPOSED_HEADERS=Content-Range
CORS_CREDENTIALS=true
CORS_MAX_AGE=18000

HASH_MEMORY_COST=81920
HASH_HASH_LENGTH=32
HASH_TIME_COST=10
HASH_PARALLELISM=2
HASH_TYPE=2
HASH_ASSOCIATED_DATA=foo

AUTH_PROVIDERS=""

EXTENSIONS_PATH="./extensions"
EXTENSIONS_AUTO_RELOAD=false

EMAIL_FROM="no-reply@example.com"
EMAIL_TRANSPORT="sendmail"
EMAIL_SENDMAIL_NEW_LINE="unix"
EMAIL_SENDMAIL_PATH="/usr/sbin/sendmail"
