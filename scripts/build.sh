# CONFIG
WORKSPACE="saber2pr";
NAME="next-tpl";

# BRANCH
default_test_branch="testing";
test_branch=${1:-$default_test_branch};

# VERSION
DATE=$(date +%Y%m%d%H%M%S);
VERSION=${2:-$DATE};

cd /home/${WORKSPACE}/${NAME};
git checkout $test_branch;
git pull origin $test_branch;
docker image build -t ${NAME}:$VERSION .