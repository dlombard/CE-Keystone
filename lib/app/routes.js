import Home from './views/Home'
import SongsList from './views/SongsList'
import Song from './views/Song'
import Base from './components/Layout/Base'
import Search from './views/Search'
import MostViewed from './views/MostViewed'
import Contactus from './views/Contactus'
import SongFromAlgolia from './views/SongFromAlgolia'
import { makeRouteConfig, Redirect, Route } from 'found';
import { graphql } from 'react-relay';
import algoliasearch from 'algoliasearch'
import React from 'react'
const algoliaClient = algoliasearch('NHHUYDVI5X', '3ea876b1f721606adb66a7288662b4fe', {
  timeout: 5000
});

const SongsListQuery = graphql`
query routes_SongsList_Query($book: String!, $lang:String!, $first: Int, $after: String, $order_by: String) {
  viewer{
    ...SongsList_viewer
  }
}
`;

const SongQuery = graphql`
query routes_Song_Query($id: ID!) {
  song(id: $id){
   id
   title
   num
   lyrics
   lyrics_Markdown{
     md
     html
   }
   book{
     name
     abbrv
   }
   language
   songId
  }
}
`;

export default makeRouteConfig(
  <Route path="/" Component={Base} >
    <Route Component={(props) => <Home {...props} />} />
    <Route exact path="/songs/:book" Component={SongsList} query={SongsListQuery} prepareVariables={params => ({ ...params, first: 60, order_by: "num", lang: "fr" })}>
    </Route>
    <Route exact path="/songs/:book/id/:id" Component={Song} query={SongQuery} prepareVariables={params => ({ ...params })}> </Route>
    <Route path="/contact-us" Component={(props) => <Contactus {...props} />}  />
    <Route path="/search/song/:id" component={SongFromAlgolia}></Route>

    <Route path="/search*" Component={(props) => { props.algoliaClient = algoliaClient; props.mykey = 2; return (<Search {...props} />) }} ></Route>
  </Route >
)

