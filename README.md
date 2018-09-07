# myretail
myretail is a react app that displays the product page.

## How to install and run
install: `npm install`

start app locally: `npm start`. App will start on port `3000`

## testing
myretail uses Jest to test the React components. To run tests run `npm test`

## css
myretail uses scss. On startup all .scss files are watched and generate .css files. The scss files won't be part of the build folder.

## Deployment
After push to master, myretail will automatically kick off deployment to netlify. Visit https://my-retail-ludtke.netlify.com/.
To see the deployed bundle you can run `npm run build` which will generate the build folder
