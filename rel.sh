#!/bin/bash
bower version $1
npm version  --no-git-tag-version $1
git push
git push --tags
npm publish
[ -e npm-debug.log ] && rm npm-debug.log

