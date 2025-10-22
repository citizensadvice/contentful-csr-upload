# App Deployment

## Stable & Unstable

As with other Contentful apps, there is a stable (prod) and unstable (dev) instance of the app in Contentful.

The unstable version is deployed into the Content Playground space and the stable version into the Public Advice space.

The app is installed in the `master` env of both spaces.

## CI / CD

The deployment workflow is:

- develop locally
- raise PR
- merge to `main` will deploy the unstable app
- feature tests run against unstable app
- deploy stable app

## Versions and Rollback

As with other Contentful apps, the `upload-ci` task that runs for both deployments will:

- upload the app package into Contentful
- set the app config to serve the app from the package
- add the GitHub SHA as the version number

Rollback to a previous version can be performed in the usual way via the Contentful app installation config screen.

## Available scripts

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the
build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

### `npm run upload`

Uploads the build folder to contentful and creates a bundle that is automatically activated. The command guides you
through the deployment process and asks for all required arguments.
Read [here](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/#deploy-with-contentful)
for more information about the deployment process.

### `npm run upload-ci`

Similar to `npm run upload` it will upload your app to contentful and activate it. The only difference is  
that with this command all required arguments are read from the environment variables, for example when you add the
upload command to your CI pipeline.

For this command to work, the following environment variables must be set:

- `CONTENTFUL_ORG_ID` - The ID of your organization
- `CONTENTFUL_APP_DEF_ID` - The ID of the app to which to add the bundle
- `CONTENTFUL_ACCESS_TOKEN` - A
  personal [access token](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/personal-access-tokens)
