# React in AngularJS Example
Proof of concept for React inside AngularJS. 

## To Run
1. `yarn`
2. `yarn json-server` to start the local data server 
3. `yarn start` to run/watch using Parcel

## Uses
* ng-react for React components inside Angular
  * Context is used to pass AngularJS injections into React components (eg. see `AngularWrapper.tsx`)
* event-reduce and Mobx for state management
* Tests using react-test-renderer with jest, and also a WIP for react-testing-library with wattle (as well as sinon and chai)
