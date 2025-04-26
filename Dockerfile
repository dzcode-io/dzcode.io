# --platform linux/amd64,linux/arm64
FROM --platform=linux/amd64 nginx:latest

# Copy the custom Nginx configuration
COPY ./custom.conf /etc/nginx/conf.d/default.conf

# Copy the static website files
COPY ./web/bundle /usr/share/nginx/html
