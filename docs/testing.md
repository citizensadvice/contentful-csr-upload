# Manual testing

The Contentful CSR upload tool (unstable) is currently installed on Content Playground, and is where the testing will need to take place. The energy-apps that use the energy supplier data is setup like intranet/corporate where our non-prod envs e.g. `cdn.develop...` point at Contentful master and use specific test entries when rendering content.
As the Content Playground is used for testing the quarterly CSR data changes there will be existing energy suppliers that may be unpublished as part of your testing. The three energy suppliers used for the manual testing are example, energy inc, and energy inc 2; these are the entries you need to check and you can ignore everything else.

We need to update the content model in Contentful `qa` env so that it includes energy suppliers to be able to move the manual testing there.

Before starting the testing steps you'll need to download/have access to the test fixtures for the good and bad test data, which can be found under `/features/fixtures`

## Scheduling error

1. Go to the [unstable app page](https://app.contentful.com/spaces/j9d3gn48j4iu/environments/master/apps/app_installations/5jjNrIbQyZh69NMdIGN5Dg/)
2. Upload the good test data csv file
3. Check the upload is successful by expecting to see "Found 3 suppliers"
4. Click `Next` and check that there are 2 ranked suppliers and 1 small supplier
5. Click `Match suppliers` and check it says "3 suppliers will be updated"
6. Click `Process suppliers` and check it says "3 suppliers will be published"
7. Schedule an update date in the past using the sidebar panel to enter a time that's one hour ago
8. Click `Schedule Update` and check that the `Scheduling result` column has `Error` next to each entry
9. Click on one of the `Error`s and check a modal pops up with an error message about the scheduling time being in the future

## Uploading valid data

1. Follow steps 1 - 6 above
2. Schedule a publishing event for 1 min in the future
3. Check that the `Scheduling result` column says `OK` for each of the 3 entries

## Uploading invalid data

1. Go to the [unstable app page](https://app.contentful.com/spaces/j9d3gn48j4iu/environments/master/apps/app_installations/5jjNrIbQyZh69NMdIGN5Dg/)
2. Select to upload the bad test data csv file
3. Check that the `Next` is greyed out and that there are errors regarding two of the rows in the CSV file
