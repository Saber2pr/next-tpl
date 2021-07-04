# CONFIG
NAME="next-tpl";
PORT=443;

docker stop ${NAME} \
&& docker rm ${NAME};
docker run --restart=always --name=${NAME} -d -e NODE_ENV=testing -p ${PORT}:${PORT} ${NAME}:$1;