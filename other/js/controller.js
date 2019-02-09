"use strict";

function removeAccentsByRegex(e) {
    var n = e.toLowerCase();
    return n = n.replace(new RegExp("\\s", "g"), ""), n = n.replace(new RegExp("[àáâãäå]", "g"), "a"), n = n.replace(new RegExp("æ", "g"), "ae"), n = n.replace(new RegExp("ç", "g"), "c"), n = n.replace(new RegExp("[èéêë]", "g"), "e"), n = n.replace(new RegExp("[ìíîï]", "g"), "i"), n = n.replace(new RegExp("ñ", "g"), "n"), n = n.replace(new RegExp("[òóôõö]", "g"), "o"), n = n.replace(new RegExp("œ", "g"), "oe"), n = n.replace(new RegExp("[ùúûü]", "g"), "u"), n = n.replace(new RegExp("[ýÿ]", "g"), "y"), n = n.replace(new RegExp("\\W", "g"), "")
}

function setLyrics(e) {
    var n = e,
        r = ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "Refrain", "Kè:", "Choeur:", "Choeur", "Kè", "Refrin", "Réfrin:"],
        o = ["Refrain", "Kè:", "Choeur:", "Choeur", "Kè", "Refrin", "Réfrin:"],
        t = [""],
        a = [""];
    for (var c in r) t.push(r[c]);
    for (var s in o) a.push(o[s]);
    var i = n.split("\n"),
        l = "";
    l = l.concat('<div id="chant">\n');
    var g = !0,
        u = !1,
        p = !1;
    for (var f in i) {
        for (var b in r)
            if (0 == i[f].trim().toLowerCase().indexOf(r[b].toLowerCase()) && i[f].toLowerCase().trim().length == r[b].length) {
                if (g) l = l.concat("<h4>" + r[b] + "</h4>\n<p>"), g = !1;
                else {
                    l = l.concat("</p>\n"), p && (p = !1, l = l.concat("</div>\n"));
                    for (var s in a) 0 == i[f].trim().toLowerCase().indexOf(a[s].toLowerCase()) && i[f].toLowerCase().trim().length == a[s].length && (l = l.concat('<div id="refrain">\n'), p = !0);
                    l = l.concat("<br/><h4>" + r[b] + "</h4>\n<p>")
                }
                u = !0, g = !1;
                break
            }
        u || i[f].length > 2 && (l = l.concat(i[f].trim() + " <br/>\n")), u = !1
    }
    return l = l.concat("</p></br></div>\n")
}
var cesperanceControllers = angular.module("cesperance-angular");
cesperanceControllers.controller("BookListController", ["$scope", "myFactory", "$http", function(e, n, r) {
    e.onBookSelected = function(e) {}, e.submit = function() {
        e.text
    }
}]);
cesperanceControllers.controller("SearchController", ["$scope", "algolia", "myFactory", "$location", function(e, n, r, o) {
    var t = n.Client("NHHUYDVI5X", "3ea876b1f721606adb66a7288662b4fe"),
        a = t.initIndex("cesperance");
        
    e.algolia = {
        query: o.search().text,
        hits: []
    }, e.$watch("algolia.query", function() {
        a.search(e.algolia.query).then(function(n) {
            console.log(n), e.algolia.hits = n.hits
        }, function(e) {
            console.log(e)
        })
    }), e.onHitSelected = function(e) {
        r.setSongFromHit(e)
    }
}]);
 cesperanceControllers.controller("SongsListController", ["$scope", "$routeParams", "myFactory", "$http", function(e, n, r, o) {
    var t = "fr";
    e.tab = 0, e._bookAbbrv = n.bookAbbrv;
    var a = r.getData(e._bookAbbrv.toUpperCase(), t);
    a.then(function(n) {
        e.songs = n.data, e.bookName = e.songs[0].book.name
    }), e.search = {
        text: ""
    }, e.changeLanguage = function(n, o) {
        e.tab = o, t = n;
        var a = r.getData(e._bookAbbrv.toUpperCase(), t);
        a.then(function(n) {
            e.songs = n.data
        })
    }, e.isSelected = function(e) {
        return this.tab === e
    }, e.isActive = function(e) {
        return this._lang === e
    }, e.onSongSelected = function(e) {
        null == e._id && (e._id = e.id), r.setSong(e)
    }, e.filterSongs = function(n) {
        var r = removeAccentsByRegex(e.search.text);
        return removeAccentsByRegex((n.title + n.num).toLowerCase()).indexOf(r.toLowerCase()) >= 0
    }, e.my_style = function() {
        var e = "";
        switch (n.bookAbbrv.toUpperCase()) {
            case "CE":
                e = "#2756a6";
                break;
            case "MJ":
                e = "#993c97";
                break;
            case "EE":
                e = "#747171";
                break;
            case "VR":
                e = "#a4c338";
                break;
            case "RN":
                e = "#27DB84";
                break;
            case "HC":
                e = "#FD8701"
        }
        return {
            "background-color": e,
            color: "#FFFFFF",
            "border-radius": "4px"
        }
    }
}]);
cesperanceControllers.controller("SongController", ["$scope", "$routeParams", "myFactory", "$sce", function(e, n, r, o) {
    if (e.song = r.getSong(), angular.equals({}, e.song)) {
        var t = r.getSongById(n.id);
        t.then(function(n) {
            e.song = n.data, e.lyrics = o.trustAsHtml(setLyrics(e.song.lyrics)), e.title = e.song.title
        })
    } else e.lyrics = o.trustAsHtml(setLyrics(e.song.lyrics)), e.title = e.song.title
}]);