# ==========================================
# Stage 1: Base Builder Stage
# ==========================================
FROM python:3.11-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ==========================================
# Stage 2: Test Runner Stage (Used in Jenkins CI)
# ==========================================
FROM python:3.11-slim AS tester

WORKDIR /app
COPY --from=builder /install /usr/local
COPY . .

# Run pytests during container validation
CMD ["pytest", "-v", "--junitxml=junit-report.xml"]

# ==========================================
# Stage 3: Production Release Stage
# ==========================================
FROM python:3.11-slim AS runner

WORKDIR /app

# Install runtime dependencies for PostgreSQL
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Security: Create non-privileged user
RUN groupadd -g 10001 appgroup && \
    useradd -u 10001 -g appgroup -s /bin/sh -m appuser

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Copy application source code
COPY . .
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 5000

# Docker Healthcheck
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Launch application via Gunicorn WSGI server
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "app:app"]
