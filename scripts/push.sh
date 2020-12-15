# push dev
git checkout dev
git push --set-upstream origin dev
# push testing
git checkout testing
git merge dev
git push --set-upstream origin testing
# push master
git checkout master
git merge testing
git push
# back to dev
git checkout dev
