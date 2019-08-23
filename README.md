# TuneIn Tuner Test

## To install the project 
From the root of the project, install the dependencies 
```
npm install
```

## To compile and hot-reload for development
```
npm run serve
```

## To compile and minify for production
```
npm run build
```

## To serve locally with node from the dist directory
```
npm install -g serve
serve -s dist
```

## To serve with standard web server
Copy the contents of the dist directory into the docroot of the webserver

Check out additional deployment options at https://cli.vuejs.org/guide/deployment.html

## To run tests
```
npm run test
```

### Tests
Until tests are not working in this set -- ran out of time trying to figure it out.  I have them working in commercial projects for my current employer, just can't quite put my finger on why.

## Architecture 

VueJS + Vuex is a reactive framework which operates in a very similar manner as ReactJS + Redux -- in that the data store is accessible by the custom components and where the data in the store is only changed by store mutators.   

If a reactive data item is only needed between the parent component and its child, I use properties passed to the child and events sent back to the parent.

If reactive data was needed by more than the above component arrangement, or across a broader set than parent -> child, I put it in the data store and used actions to set the data, getters to access it.

I chose bootstrap-vue to provide prebuilt page components, and the bootstrap layout helpers to pretty up the presentation.

When running in development mode, I discovered that the listeners of my IDE cause a CORs issue accessing the API, so in dev I return a static station list, in prod it uses the API.  Probably would be a good idea to have a smaller set of "always known good" stations in that static data so the user can still use the site when, if for any reason the API is inaccessible.

# TODOs -- if I had more time
## src/constants.js: 
Gather more literals as constants here

## src/_store/preferences.module.js: 
store preferences in localstorage between page visits, e.g. last station played

Add ability for user to add custom tags, and personal ratings

## src/_store/stations.module.js
trigger loading indicator on the station list in case the API is slow

identify potential errors reaching the API or audio playback and choose human readable error messages to display

## src/components/StationList.vue
Add animation while station list is loading, in case it's slow.