FROM node:alpine
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
	then yarn install; \
	else yarn install --production=true; \
	fi
COPY . ./
EXPOSE 3000
USER node
CMD [ "yarn", "dev" ]