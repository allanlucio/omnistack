#!/bin/bash

#On error no such file entrypoint.sh, execute in terminal - dos2unix .docker\entrypoint.sh

npm config set cache /home/node/app/.npm-cache --global
cd /home/node/app
npm install

# cd backend
# if [! -f ".env"]; then
#     cp .env.example .env
# fi
# if [! -f ".env.testing"]; then
#     cp .env.testing.example .env.testing
# fi


chown -R node:node /home/node/app/
chmod -R 775 /home/node/app/

node
