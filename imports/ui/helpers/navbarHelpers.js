import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../templates/navbars.html';

Template.navbarInactive.onCreated(function helloOnCreated() {
  console.log("navbarInactive created")
});
