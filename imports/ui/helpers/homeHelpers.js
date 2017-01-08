import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../templates/home.html';

document.title = "mixr";

Template.homeCover.onCreated(function helloOnCreated() {
  console.log("homeCover actually created")
});
