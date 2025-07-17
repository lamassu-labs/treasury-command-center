#!/bin/bash

# Treasury Command Center Documentation - Manual Deployment
# Deploys to Staten Island VPS (74.50.113.152) hosting nuru.network

set -e

echo "🚀 Treasury Command Center Documentation - Manual Deployment"
echo "=============================================================="
echo ""

# Configuration
VPS_IP="74.50.113.152"
VPS_USER="root"
TAMPA_IP="23.92.65.243"
TAMPA_PASSWORD="YS6OaT2uruHa"
SSH_KEY_NAME="treasury-docs-deploy"
TARGET_PATH="/var/www/html/treasury-monitoring/docs"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to check if SSH key exists
check_ssh_key() {
    print_step "Checking for existing SSH key..."
    
    if [ -f ~/.ssh/${SSH_KEY_NAME} ]; then
        print_success "SSH key ~/.ssh/${SSH_KEY_NAME} already exists"
        return 0
    else
        print_warning "SSH key not found, will generate new one"
        return 1
    fi
}

# Function to generate SSH key
generate_ssh_key() {
    print_step "Generating SSH key for deployment..."
    
    ssh-keygen -t ed25519 -f ~/.ssh/${SSH_KEY_NAME} -C "treasury-docs-deploy@nuru.network" -N ""
    chmod 600 ~/.ssh/${SSH_KEY_NAME}
    chmod 644 ~/.ssh/${SSH_KEY_NAME}.pub
    
    print_success "SSH key generated: ~/.ssh/${SSH_KEY_NAME}"
    echo ""
    echo "Public key content:"
    cat ~/.ssh/${SSH_KEY_NAME}.pub
    echo ""
}

# Function to setup SSH key on server using Tampa VPS as bridge
setup_ssh_access() {
    print_step "Setting up SSH access to Staten Island VPS..."
    
    # Check if sshpass is available
    if ! command -v sshpass &> /dev/null; then
        print_warning "sshpass not found. Please install it:"
        echo "  macOS: brew install hudochenkov/sshpass/sshpass"
        echo "  Ubuntu: sudo apt-get install sshpass"
        echo ""
        print_error "Cannot proceed without sshpass"
        exit 1
    fi
    
    # Get the public key content
    PUBLIC_KEY=$(cat ~/.ssh/${SSH_KEY_NAME}.pub)
    
    print_step "Using Tampa VPS to setup access to Staten Island..."
    
    # Use Tampa VPS to setup SSH key on Staten Island
    sshpass -p "$TAMPA_PASSWORD" ssh -o StrictHostKeyChecking=no root@$TAMPA_IP << EOF
echo "🔑 Setting up SSH access from Tampa to Staten Island..."

# Try to add the key to Staten Island
ssh -o StrictHostKeyChecking=no -o PasswordAuthentication=no root@$VPS_IP "
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
    echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys
    echo 'SSH key added to Staten Island'
" || echo "Direct SSH setup failed, may need manual intervention"

EOF
    
    print_success "SSH setup attempt completed"
}

# Function to test SSH access
test_ssh_access() {
    print_step "Testing SSH access to Staten Island VPS..."
    
    if ssh -o StrictHostKeyChecking=no -i ~/.ssh/${SSH_KEY_NAME} $VPS_USER@$VPS_IP "echo 'SSH connection successful'" 2>/dev/null; then
        print_success "SSH access to Staten Island VPS working!"
        return 0
    else
        print_error "SSH access failed"
        return 1
    fi
}

# Function to build documentation
build_docs() {
    print_step "Building Treasury Command Center documentation..."
    
    cd website
    
    if [ ! -d "node_modules" ]; then
        print_step "Installing dependencies..."
        npm install
    fi
    
    print_step "Building production site..."
    npm run build
    
    if [ -d "build" ]; then
        print_success "Documentation built successfully"
        print_step "Build contents:"
        ls -la build/
    else
        print_error "Build failed - no build directory created"
        exit 1
    fi
    
    cd ..
}

# Function to deploy documentation
deploy_docs() {
    print_step "Deploying documentation to Staten Island VPS..."
    
    # Create target directory and clear old content
    ssh -i ~/.ssh/${SSH_KEY_NAME} $VPS_USER@$VPS_IP "
        echo '🚀 Preparing deployment directory...'
        mkdir -p $TARGET_PATH
        rm -rf $TARGET_PATH/*
        echo '✅ Directory prepared'
    "
    
    # Upload files
    print_step "Uploading documentation files..."
    scp -i ~/.ssh/${SSH_KEY_NAME} -r website/build/* $VPS_USER@$VPS_IP:$TARGET_PATH/
    
    # Set proper permissions and reload nginx
    ssh -i ~/.ssh/${SSH_KEY_NAME} $VPS_USER@$VPS_IP "
        echo '🔧 Setting proper permissions...'
        chown -R www-data:www-data /var/www/html/treasury-monitoring/
        chmod -R 755 /var/www/html/treasury-monitoring/
        
        echo '🔄 Testing and reloading nginx...'
        nginx -t
        systemctl reload nginx
        
        echo '✅ Treasury Command Center documentation deployed successfully!'
        echo '🌐 Available at: https://nuru.network/treasury-monitoring/docs/'
        
        echo '📁 Deployment verification:'
        ls -la $TARGET_PATH/
    "
    
    print_success "Deployment completed!"
}

# Function to verify deployment
verify_deployment() {
    print_step "Verifying deployment..."
    
    echo "🌐 Testing URL: https://nuru.network/treasury-monitoring/docs/"
    
    # Test if the site responds
    if curl -s -o /dev/null -w "%{http_code}" https://nuru.network/treasury-monitoring/docs/ | grep -q "200"; then
        print_success "Website is responding with HTTP 200"
    else
        print_warning "Website may not be responding correctly"
    fi
    
    echo ""
    echo "🎉 Deployment complete! Visit: https://nuru.network/treasury-monitoring/docs/"
    echo ""
    echo "📋 Next steps:"
    echo "1. Test all documentation pages and navigation"
    echo "2. Add SSH_PRIVATE_KEY to GitHub repository secrets for automated deployment"
    echo "3. Copy private key content: cat ~/.ssh/${SSH_KEY_NAME}"
}

# Main execution
main() {
    print_step "Starting Treasury Command Center documentation deployment..."
    echo ""
    
    # Check prerequisites
    if ! command -v npm &> /dev/null; then
        print_error "npm is required but not installed"
        exit 1
    fi
    
    if ! command -v ssh &> /dev/null; then
        print_error "ssh is required but not installed"
        exit 1
    fi
    
    # Setup SSH access
    if ! check_ssh_key; then
        generate_ssh_key
        setup_ssh_access
    fi
    
    # Test SSH access
    if ! test_ssh_access; then
        print_error "SSH access setup failed. Manual intervention required."
        echo ""
        echo "Manual setup steps:"
        echo "1. Copy the public key: cat ~/.ssh/${SSH_KEY_NAME}.pub"
        echo "2. Add it to Staten Island VPS: ssh root@$VPS_IP"
        echo "3. Add to authorized_keys: echo 'PUBLIC_KEY' >> ~/.ssh/authorized_keys"
        echo "4. Set permissions: chmod 600 ~/.ssh/authorized_keys"
        echo "5. Re-run this script"
        exit 1
    fi
    
    # Build and deploy
    build_docs
    deploy_docs
    verify_deployment
    
    print_success "Treasury Command Center documentation deployment completed!"
}

# Run main function
main "$@"