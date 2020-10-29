# CONFIG
WORKSPACE="saber2pr";
NAME="next-tpl";
PORT=8080;

# VERSION
DATE=$(date +%Y%m%d%H%M%S);
VERSION=$DATE;

# BRANCH
default_test_branch="testing";
test_branch=${1:-$default_test_branch};

cd /home/${WORKSPACE}/${NAME};
git checkout $test_branch;
git pull origin $test_branch;
docker image build -t ${NAME}:$VERSION . \
&& docker stop ${NAME} \
&& docker rm ${NAME} \
&& docker run --name=${NAME} -d -e NODE_ENV=testing -p ${PORT}:${PORT} ${NAME}:${VERSION};