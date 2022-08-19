FROM 10.152.160.20:30002/devops/nginx:v14.0
COPY /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/
ENTRYPOINT ["nginx","-g","daemon off;"]
