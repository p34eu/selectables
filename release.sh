#!/bin/bash
#
# Release new version in npm and bower
#

V=`npm version patch --no-git-tag`

sed -i ""  '4s/.*/\ \*   {$V}/g' selectables.js

git add -A && git commit -m "$1"

bower version $V

git push

git push --tags

npm publish


