if (Meteor.isClient) {
  Meteor.startup(function () {

  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

if (Meteor.isCordova) {
    Meteor.startup(function () {
    var reactiveBeaconRegion = new ReactiveBeaconRegion({
      identifier: "iBeacons in IOMedia C",
      uuid: "1f169f64-d21d-4a69-ac5f-271db629caca"
    });

    Tracker.autorun(function () {
      if (reactiveBeaconRegion.getBeaconRegion().inRegion) {
        alert(JSON.stringify(reactiveBeaconRegion.getBeaconRegion()));
      }
    })
  })
}
