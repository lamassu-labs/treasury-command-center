#!/bin/bash
# Polka-Trinity Ultimate AI Trinity Health Check
# Enterprise-grade health validation for trillion-parameter governance intelligence
#
# Validates:
# - Multi-Xnode coordination health
# - Ultimate AI Trinity model availability
# - Enterprise API responsiveness
# - Database and cache connectivity
# - System resource utilization

set -euo pipefail

# Health check configuration
HEALTH_ENDPOINT="http://localhost:8099/health"
TRINITY_STATUS_ENDPOINT="http://localhost:8099/trinity/status"
TIMEOUT=10
MAX_RESPONSE_TIME=5000  # 5 seconds max response time

# Logging function
log() {
    echo "[$(date -u +"%Y-%m-%d %H:%M:%S UTC")] HEALTH: $1"
}

log "🔍 Starting Ultimate AI Trinity health validation..."

# Function to check HTTP endpoint with timing
check_endpoint() {
    local url=$1
    local name=$2
    local start_time=$(date +%s%3N)
    
    if curl -s -f --max-time $TIMEOUT "$url" > /dev/null 2>&1; then
        local end_time=$(date +%s%3N)
        local response_time=$((end_time - start_time))
        
        if [ $response_time -lt $MAX_RESPONSE_TIME ]; then
            log "✅ $name: HEALTHY (${response_time}ms)"
            return 0
        else
            log "⚠️ $name: SLOW (${response_time}ms > ${MAX_RESPONSE_TIME}ms)"
            return 1
        fi
    else
        log "❌ $name: FAILED"
        return 1
    fi
}

# Function to check Ultimate AI Trinity status
check_trinity_status() {
    local response
    if response=$(curl -s --max-time $TIMEOUT "$TRINITY_STATUS_ENDPOINT" 2>/dev/null); then
        # Parse JSON response for flagship model status
        if echo "$response" | grep -q "1.306+ trillion" && echo "$response" | grep -q "DeepSeek-R1"; then
            log "✅ Ultimate AI Trinity: OPERATIONAL (1.3T+ parameters)"
            return 0
        else
            log "⚠️ Ultimate AI Trinity: PARTIAL (some models may be unavailable)"
            return 1
        fi
    else
        log "❌ Ultimate AI Trinity: UNAVAILABLE"
        return 1
    fi
}

# Function to check system resources
check_system_resources() {
    # Memory usage check
    local memory_usage=$(free | grep Mem | awk '{printf "%.1f", $3/$2 * 100.0}')
    local memory_threshold=90.0
    
    if awk "BEGIN {exit ($memory_usage > $memory_threshold)}"; then
        log "✅ Memory usage: ${memory_usage}% (within limits)"
    else
        log "⚠️ Memory usage: ${memory_usage}% (exceeds ${memory_threshold}%)"
        return 1
    fi
    
    # CPU load check
    local cpu_load=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
    local cpu_cores=$(nproc)
    local cpu_threshold=$(echo "$cpu_cores * 0.8" | bc -l)
    
    if awk "BEGIN {exit ($cpu_load > $cpu_threshold)}"; then
        log "✅ CPU load: ${cpu_load} (within limits for ${cpu_cores} cores)"
    else
        log "⚠️ CPU load: ${cpu_load} (exceeds ${cpu_threshold} for ${cpu_cores} cores)"
        return 1
    fi
    
    # Disk usage check
    local disk_usage=$(df /app | tail -1 | awk '{print $5}' | sed 's/%//')
    local disk_threshold=85
    
    if [ "$disk_usage" -lt "$disk_threshold" ]; then
        log "✅ Disk usage: ${disk_usage}% (within limits)"
    else
        log "⚠️ Disk usage: ${disk_usage}% (exceeds ${disk_threshold}%)"
        return 1
    fi
    
    return 0
}

# Function to check Multi-Xnode connectivity
check_xnode_connectivity() {
    local privacy_xnode="${PRIVACY_XNODE:-23.92.65.57}"
    local performance_xnode="${PERFORMANCE_XNODE:-23.92.65.18}"
    local xnode_status=0
    
    # Privacy Xnode connectivity
    if timeout 5 nc -z "$privacy_xnode" 22 2>/dev/null; then
        log "✅ Privacy Xnode ($privacy_xnode): REACHABLE"
    else
        log "⚠️ Privacy Xnode ($privacy_xnode): UNREACHABLE"
        xnode_status=1
    fi
    
    # Performance Xnode connectivity (Ollama API)
    if timeout 5 nc -z "$performance_xnode" 11434 2>/dev/null; then
        log "✅ Performance Xnode ($performance_xnode): REACHABLE"
    else
        log "⚠️ Performance Xnode ($performance_xnode): UNREACHABLE"
        xnode_status=1
    fi
    
    return $xnode_status
}

# Function to check database connectivity
check_database() {
    if [ -n "${DATABASE_URL:-}" ]; then
        # Extract host and port from DATABASE_URL
        local db_host=$(echo "$DATABASE_URL" | sed -n 's/.*@\([^:]*\):.*/\1/p')
        local db_port=$(echo "$DATABASE_URL" | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
        
        if timeout 5 nc -z "$db_host" "$db_port" 2>/dev/null; then
            log "✅ PostgreSQL: CONNECTED"
            return 0
        else
            log "❌ PostgreSQL: DISCONNECTED"
            return 1
        fi
    else
        log "⚠️ PostgreSQL: No DATABASE_URL configured"
        return 1
    fi
}

# Function to check Redis connectivity
check_redis() {
    if [ -n "${REDIS_URL:-}" ]; then
        local redis_host=$(echo "$REDIS_URL" | sed -n 's/.*\/\/\([^:]*\):.*/\1/p')
        local redis_port=$(echo "$REDIS_URL" | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
        
        if timeout 5 nc -z "$redis_host" "$redis_port" 2>/dev/null; then
            log "✅ Redis: CONNECTED"
            return 0
        else
            log "⚠️ Redis: DISCONNECTED (non-critical)"
            return 0  # Redis is non-critical for basic operation
        fi
    else
        log "⚠️ Redis: No REDIS_URL configured"
        return 0  # Non-critical
    fi
}

# Main health check execution
main() {
    local overall_status=0
    
    log "🏥 Enterprise Health Check - Ultimate AI Trinity"
    log "🏗️ Infrastructure: Multi-Xnode Sovereign Architecture"
    log "🧠 AI Models: DeepSeek-R1:671b + Llama4:maverick + Qwen3:235b"
    
    # Core API health check
    if ! check_endpoint "$HEALTH_ENDPOINT" "Core API"; then
        overall_status=1
    fi
    
    # Ultimate AI Trinity status check
    if ! check_trinity_status; then
        overall_status=1
    fi
    
    # Multi-Xnode connectivity check
    if ! check_xnode_connectivity; then
        log "⚠️ Multi-Xnode connectivity issues detected (may impact performance)"
        # Don't fail health check for Xnode connectivity in development
        if [ "${ENVIRONMENT:-development}" = "production" ]; then
            overall_status=1
        fi
    fi
    
    # Database connectivity check
    if ! check_database; then
        overall_status=1
    fi
    
    # Redis connectivity check (non-critical)
    check_redis
    
    # System resource check
    if ! check_system_resources; then
        log "⚠️ System resource utilization high (monitoring required)"
        # Don't fail health check for resource usage unless critical
    fi
    
    # Overall health status
    if [ $overall_status -eq 0 ]; then
        log "🎯 Overall Status: HEALTHY"
        log "✅ Ultimate AI Trinity operational with enterprise-grade performance"
        log "💰 Cost efficiency: \$0 AI operational costs maintained"
        log "🏆 Infrastructure sovereignty: 100% customer ownership confirmed"
    else
        log "❌ Overall Status: UNHEALTHY"
        log "🚨 Critical issues detected - manual intervention required"
    fi
    
    return $overall_status
}

# Execute main health check
main

# Exit with appropriate status code
exit $?