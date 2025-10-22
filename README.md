# CSR Upload Tool

Uploads data from the Energy Policy team into Contentful `Energy Supplier` entries, which are displayed in
the [energy comparison table](https://www.citizensadvice.org.uk/consumer/your-energy/get-a-better-energy-deal/compare-domestic-energy-suppliers-customer-service/).

You can see a list of other Contentful apps
here: https://citizensadvice.atlassian.net/wiki/spaces/NP/pages/3751968769/Contentful+Apps

This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

## Getting started

See the [getting started docs](./docs/getting-started.md)

## Deployment

See the [deployment docs](./docs/deployment.md)

## What does the app do?

The app accepts a `.csv` file, extracts information from it and updates Contentful `Energy Supplier` entities. It then allows the user
to schedule an update operation for each changed entry so that the changes are published at the same time at some point in the future.

The Digital Energy team liases with the Energy Policy to co-ordinate the upload, which is normally done by a content designer. Sometimes the Energy Policy team get the data into a draft form a few weeks before the publishing date. If possible, it's good to test this with the upload tool in the Content Playground environment, and flag any issues to the Digital Energy team. These might include:

- typos in supplier names that show up as a name change in the upload tool
- missing data
- missing suppliers
- change from ranked to small suppliers or vice versa
- badly formatted data

The overall process is:

- upload CSV version of the most recent tab
- match the suppliers in the CSV to existing suppliers in contentful, using the `supplierId` field
- update existing suppliers in Contentful using info in the CSV
- create new suppliers that are in the CSV but not Contentful
- archive suppliers in Contentful but not in the CSV
- schedule the archiving and publishing of changes for the required date

## Supplier matching

Suppliers are matched by comparing the `supplierId` field in the Contentful entry with the `SupplierId` column in the CSV file.

For every supplier in the CSV that is matched with one in Contentful, the uploader will copy over the data in the CSV file to fields
in that supplier, and publish the changes at the scheduled time.

For every supplier that is in the CSV file that cannot be matched with any in Contentful, the uploader will create a new supplier in Contentful
and publish it at the scheduled time.

For every supplier that is in Contentful but not in the CSV file, Contentful will archive the supplier at the scheduled time.

## Quarter Dates

The CSR pages display quarter dates that describe the time period the scores are for, and when the next set of scores will be published.

This information is stored in a pair of `Energy table - content pattern` content types which also need updating with each data update.  
The upload tool doesn't consider these entries during the upload, so the content designer needs to remember to update them and schedule
their publishing at the same time the `Energy supplier` entries are published.
