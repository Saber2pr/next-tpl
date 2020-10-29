# CONFIG
NAME="next-tpl";
PORT=8080;

docker stop ${NAME} \
&& docker rm ${NAME};
docker run --name=${NAME} -d -e NODE_ENV=testing -p ${PORT}:${PORT} ${NAME}:$1;