
FROM nginx

COPY ./nginx/cpa.conf /etc/nginx/conf.d/cpa.conf

COPY ./build /usr/share/nginx/html

EXPOSE 8082
