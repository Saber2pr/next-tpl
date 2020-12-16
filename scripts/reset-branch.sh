# master
git checkout master
# reset testing
git branch -D testing
git push origin :testing
git checkout -b testing
git push --set-upstream origin testing
# reset dev
git branch -D dev
git push origin :dev
git checkout -b dev
git push --set-upstream origin dev