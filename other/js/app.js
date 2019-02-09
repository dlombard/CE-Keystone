"use strict";
var app = angular.module("cesperance-angular", ["ngSanitize", "ngRoute", "algoliasearch", "cesperanceFactory"], function($locationProvider) {
    $locationProvider.html5Mode(true);
});
app.config(["$compileProvider", function($compileProvider) {
    $compileProvider.debugInfoEnabled(false)
}]);
app.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/books", {
        templateUrl: "partials/books_body.html",
        controller: "BookListController"
    }).when("/books/:bookAbbrv", {
        templateUrl: "partials/songslist.html",
        controller: "SongsListController"
    }).when("/books/:bookAbbrv/:id", {
        templateUrl: "partials/song.html",
        controller: "SongController"
    }).when("/books/:bookAbbrv/:id", {
        templateUrl: "partials/song.html",
        controller: "SongController"
    }).when("/search", {
        templateUrl: "partials/search.html",
        controller: "SearchController"
    }).otherwise({
        redirectTo: "/books"
    })
}]);

