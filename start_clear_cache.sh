watchman watch-del-all && rm -rf node_modules && yarn install && yarn cache clean && rm -fr $TMPDIR/metro-cache && npx expo start --clear