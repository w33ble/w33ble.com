# build the site using node container
FROM node:8
WORKDIR /build
# RUN npm install -g yarn
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY src/sass/ ./src/sass
RUN npx node-sass --output-style compact src/sass/main.scss public/css/main.css
RUN npx node-sass --output-style compact src/sass/ie8.scss public/css/ie8.css
RUN npx node-sass --output-style compact src/sass/ie9.scss public/css/ie9.css

# distribute much smaller alpine image
FROM nginx:alpine
WORKDIR /app

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY ./public /usr/share/nginx/html
COPY ./index.html /usr/share/nginx/html

COPY --from=0 /build/public /usr/share/nginx/html
