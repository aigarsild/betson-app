# BetsonApp

Angular application search page that uses [The Open Movie Database](http://www.omdbapi.com/) api.

[You can see the demo here](http://sad-benz-ff86d6.netlify.com/)

# About the project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.
The application uses [The Open Movie Database](http://www.omdbapi.com/) api to create a search page for movies search.

## Design

Design is minimalistic and made keeping in mind different devices with different screen sizes. 
So it would be less changes in different screens and less time developing UI elements.

## Brand colors

Colors were generated from [Coolors](https://coolors.co/) color picker for web safe colors.

## Development

Development is done in component based development way. Angular is component based MVC framework.
In this project I developed 2 components for search page and detail page. Also generated services component for http calls.
I used Rxjs for obseervables, also used SCSS for styles and for creating mixins and variables. 

## Future fixes

This is a prototype so there are some things missing because of time limitations or because it didnt make sense to implement right now, things that can be added in the future.
Some of the things are: There could be and indication for when the content is loading, there could be history with latest searches saved into the browser cache.

# How to install

Clone or download the repository. Navigate to the folder locally and run `npm i` to install the node modules.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
