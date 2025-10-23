# State

The app uses the [redux toolkit](https://redux-toolkit.js.org/) to manage all the state in the app.

## The store

This is where the data used by the app is held. It is broken into `slices`:

- suppliers parsed from the CSV file (`supplier`)
- suppliers found in Contentful (`contentfulSupplier`)
- the time publishing is scheduled for (`scheduleTime`)
- what the app is currently doing, eg parsing data, fetching data from Contentful, updating data in Contentful (`appStatus`)
- which screen is being shown (`screen`)
- errors returned from Contentful API (`contentfulError`)
- errors uploading the CSV file (`uploadError`)

## Reducers

Data is put into the store via `reducer` functions, which are 'dispatched' from other parts of the app to update the state in the store.

(It is actually `actions` that are dispatched, but the toolkit abstracts this away - you can read more about this in the [legacy example](https://redux.js.org/introduction/getting-started#legacy-example)).

For example, in the [`appStatusSlice`](../src/state/appStatusSlice.js) we have the `setAppStatus` reducer function:

```js
    setAppStatus: (state, action) => {
      state.value = action.payload;
    },
```

This can be used elsewhere to change the app status:

```js
// my-component.jsx

import setAppStatus from "../src/state/appStatusSlice";

...

dispatch(setAppStatus("my new status"));

...
```

You can read more about this in the [redux docs](https://redux-toolkit.js.org/api/createSlice)

## Selectors

### Direct access of the `state`

Use the `useSelector` function in `redux-toolkit` to get data from the state directly:

```js
const screen = useSelector((state) => state.screen.value);
console.log(screen);
// "processSuppliers"
```

### Reselect and caching

Custom selector functions can be used to memoise more complex or parameterised extractions eg where filtering or combining/comparing
different slices of the state.

The toolkit uses `reslect` under the hood to cache the results of these queries and only re-run them if
any of the parameters have changed. These are are defined in the [selectors file](../src/selectors/index.js) - there is scope
to split this up into smaller files if required.

Selectors are created using the `createSelector` function from the redux toolkit, which is a re-export of the `reselect` library. You can find
the docs for this function in the [`reselect` docs](https://reselect.js.org/api/createselector/).

These can be imported and used elsewhere in the app.

```js
// my-other-component.jsx

const suppliersNotInContentful = useSelector(getSuppliersNotInContentful);
```
