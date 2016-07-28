#!/bin/bash
#
# Replaces version string in js file, assuming it is otn 4th line.
# Release new version in npm and bower

V=`npm version patch --no-git-tag`

sed -i ""  '4s/.*/\ \*   $V/g' selectables.js

[ -e npm-debug.log ] && rm npm-debug.log
git commit -a -m $1

bower version $V

git push
git push --tags
npm publish
[ -e npm-debug.log ] && rm npm-debug.log

