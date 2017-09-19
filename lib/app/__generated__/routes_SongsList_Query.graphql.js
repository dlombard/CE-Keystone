/**
 * @flow
 * @relayHash 21a73aa3092c5bb4e32a6ef77ebea28d
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type routes_SongsList_QueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query routes_SongsList_Query(
  $book: String!
  $lang: String!
  $first: Int
  $after: String
  $order_by: String
) {
  viewer {
    ...SongsList_viewer
    id
  }
}

fragment SongsList_viewer on Viewer {
  songs(book: $book, language: $lang, order_by: $order_by, first: $first, after: $after) {
    edges {
      node {
        id
        book {
          name
        }
        title
        num
        ...SongListItem_song
        __typename
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  ...SongListItem_viewer
}

fragment SongListItem_song on Song {
  id
  num
  title
  book {
    name
    abbrv
  }
}

fragment SongListItem_viewer on Viewer {
  id
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "book",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "lang",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "first",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "after",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "order_by",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "routes_SongsList_Query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "SongsList_viewer",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "routes_SongsList_Query",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "book",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "lang",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "first",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "after",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "order_by",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "routes_SongsList_Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "after",
                "variableName": "after",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "book",
                "variableName": "book",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "first",
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "language",
                "variableName": "lang",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "order_by",
                "variableName": "order_by",
                "type": "String"
              }
            ],
            "concreteType": "SongConnection",
            "name": "songs",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "SongEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Song",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Book",
                        "name": "book",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "name",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "abbrv",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "num",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "after",
                "variableName": "after",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "book",
                "variableName": "book",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "first",
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "language",
                "variableName": "lang",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "order_by",
                "variableName": "order_by",
                "type": "String"
              }
            ],
            "handle": "connection",
            "name": "songs",
            "key": "Songs_songs",
            "filters": [
              "book",
              "language",
              "order_by"
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query routes_SongsList_Query(\n  $book: String!\n  $lang: String!\n  $first: Int\n  $after: String\n  $order_by: String\n) {\n  viewer {\n    ...SongsList_viewer\n    id\n  }\n}\n\nfragment SongsList_viewer on Viewer {\n  songs(book: $book, language: $lang, order_by: $order_by, first: $first, after: $after) {\n    edges {\n      node {\n        id\n        book {\n          name\n        }\n        title\n        num\n        ...SongListItem_song\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  ...SongListItem_viewer\n}\n\nfragment SongListItem_song on Song {\n  id\n  num\n  title\n  book {\n    name\n    abbrv\n  }\n}\n\nfragment SongListItem_viewer on Viewer {\n  id\n}\n"
};

module.exports = batch;
