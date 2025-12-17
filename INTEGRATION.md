# Backend Integration Guide

This guide explains how to integrate the PetCare frontend with the Django REST API backend.

## Architecture Overview

```
┌─────────────────┐      HTTP/REST      ┌─────────────────┐
│   Next.js       │ ───────────────────► │  Django REST    │
│   Frontend      │                      │  API Backend    │
│   (Port 3000)   │ ◄─────────────────── │  (Port 8000)    │
└─────────────────┘      JSON/Cookies    └─────────────────┘
```

## Prerequisites

- Django backend running and accessible
- Backend should have CORS configured
- Backend should serve at `/api/v1/` endpoints

## Environment Configuration

Configure the backend URL in your environment file:

**Development (`.env.local`):**

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_BASE_PATH=/api/v1
```

**Production (`.env.production`):**

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_API_BASE_PATH=/api/v1
```

## API Integration

### Authentication Flow

The frontend uses **Token-based authentication**:

1. User logs in via `/api/v1/auth/login/`
2. Backend returns authentication token
3. Token is stored in `localStorage`
4. All subsequent requests include `Authorization: Token <token>` header

### API Client Configuration

The API client (`src/infrastructure/http/api-client.ts`) handles:

- **Base URL**: Configured via environment variables
- **Token Management**: Auto-attaches token to requests
- **CSRF Protection**: Includes `X-CSRFToken` header
- **Error Handling**: Redirects to login on 401
- **Request Retries**: Automatic retry on network failures

### Axios Interceptors

```typescript
// Request interceptor: adds auth token
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

// Response interceptor: handles 401
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
```

## Backend Requirements

### CORS Configuration

Your Django backend needs proper CORS settings:

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Development
    "https://your-frontend-domain.com",  # Production
]

CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "https://your-frontend-domain.com",
]
```

### Required API Endpoints

The frontend expects these endpoints from the backend:

| Endpoint                                         | Method    | Purpose              |
| ------------------------------------------------ | --------- | -------------------- |
| `/api/v1/auth/login/`                            | POST      | User authentication  |
| `/api/v1/auth/register/`                         | POST      | User registration    |
| `/api/v1/auth/logout/`                           | POST      | User logout          |
| `/api/v1/accounts/me/`                           | GET       | Current user profile |
| `/api/v1/pets/pets/`                             | GET, POST | Pet management       |
| `/api/v1/pets/breeds/`                           | GET       | Available breeds     |
| `/api/v1/schedule/appointments/`                 | GET, POST | Appointments         |
| `/api/v1/schedule/services/`                     | GET       | Available services   |
| `/api/v1/schedule/appointments/available-slots/` | GET       | Available time slots |
| `/api/v1/store/products/`                        | GET       | Products catalog     |
| `/api/v1/health/records/`                        | GET, POST | Health records       |

## Docker Network Integration

If both frontend and backend run in Docker:

### 1. Create Shared Network

```bash
docker network create gateway_net
```

### 2. Configure Backend

```yaml
# backend/docker-compose.yml
networks:
    default:
        name: gateway_net
        external: true
```

### 3. Configure Frontend

```yaml
# frontend/docker-compose.yml
networks:
    gateway_net:
        external: true
```

### 4. Internal Communication

- **From browser**: Use `http://localhost:8000`
- **From Next.js SSR**: Use `http://backend-service-name:8000`

## Data Flow Examples

### 1. User Login

```
┌──────────┐      POST /login      ┌──────────┐
│ Frontend │ ───────────────────►  │  Django  │
│          │                        │          │
│          │ ◄───────────────────  │          │
└──────────┘  {token: "abc123"}    └──────────┘
     │
     ├─► Store token in localStorage
     └─► Redirect to /dashboard
```

### 2. Fetch User Pets

```
┌──────────┐  GET /api/v1/pets/    ┌──────────┐
│ Frontend │  Authorization: Token │  Django  │
│          │ ───────────────────►  │          │
│          │                        │          │
│          │ ◄───────────────────  │          │
└──────────┘  [{id:1,name:"Rex"}]  └──────────┘
     │
     └─► Update UI with pets list
```

### 3. Create Appointment

```
┌──────────┐  POST /appointments/  ┌──────────┐
│ Frontend │  {pet:1,service:2}    │  Django  │
│          │ ───────────────────►  │          │
│          │                        │          │
│          │ ◄───────────────────  │          │
└──────────┘  {id:5,status:"ok"}   └──────────┘
     │
     └─► Show success message
     └─► Invalidate appointments cache
```

## Error Handling

The frontend handles common API errors:

| Status Code      | Frontend Behavior                   |
| ---------------- | ----------------------------------- |
| 401 Unauthorized | Clear token, redirect to login      |
| 403 Forbidden    | Show "Access Denied" message        |
| 404 Not Found    | Show "Resource not found"           |
| 500 Server Error | Show "Server error, try again"      |
| Network Error    | Auto-retry with exponential backoff |

## Testing Integration

### 1. Test Backend Availability

```bash
curl http://localhost:8000/api/v1/status/
```

### 2. Test CORS

```bash
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:8000/api/v1/auth/login/
```

### 3. Test Authentication

```bash
curl -X POST http://localhost:8000/api/v1/auth/login/ \
     -H "Content-Type: application/json" \
     -d '{"username":"test","password":"test123"}'
```

## Troubleshooting

### CORS Errors

**Problem**: `Access-Control-Allow-Origin` error in browser

**Solutions**:

1. Check `CORS_ALLOWED_ORIGINS` in Django settings
2. Ensure `CORS_ALLOW_CREDENTIALS = True`
3. Verify frontend URL matches exactly (no trailing slash issues)

### 401 Errors

**Problem**: All requests return 401 Unauthorized

**Solutions**:

1. Check token is stored in `localStorage`
2. Verify `Authorization` header is being sent
3. Check token hasn't expired on backend
4. Ensure backend accepts `Token` authentication scheme

### Network Errors

**Problem**: "Network request failed" or "ERR_CONNECTION_REFUSED"

**Solutions**:

1. Verify backend is running (`docker ps`)
2. Check backend port is exposed
3. Verify `NEXT_PUBLIC_API_URL` is correct
4. Check firewall/network settings

## Performance Optimization

### 1. Request Caching

Uses TanStack Query for smart caching:

```typescript
// Pets are cached for 5 minutes
useQuery({
    queryKey: ["pets"],
    queryFn: () => petRepository.findAll(),
    staleTime: 5 * 60 * 1000,
});
```

### 2. Request Batching

Related requests are batched when possible:

```typescript
// Fetch user + pets + appointments in parallel
const [user, pets, appointments] = await Promise.all([
    userRepository.getMe(),
    petRepository.findAll(),
    appointmentRepository.findAll(),
]);
```

### 3. Optimistic Updates

UI updates before backend confirmation:

```typescript
// UI shows new pet immediately
mutate({
    onMutate: async (newPet) => {
        // Optimistically add to cache
        queryClient.setQueryData(["pets"], (old) => [...old, newPet]);
    },
});
```

## Security Best Practices

1. **Never commit** `.env` files with real tokens
2. **Always use HTTPS** in production
3. **Validate** all user input before sending to API
4. **Sanitize** API responses before rendering in UI
5. **Implement rate limiting** on sensitive endpoints
6. **Use CSRF tokens** for all mutations

## Additional Resources

- [Django REST Framework Authentication](https://www.django-rest-framework.org/api-guide/authentication/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
- [TanStack Query](https://tanstack.com/query/latest)
