'use strict';

require('d3');

console.log("blah");

const svg = d3select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

csv('countrydata.csv').then(data => {
    console.log(data);
});
console.log("js run here");
