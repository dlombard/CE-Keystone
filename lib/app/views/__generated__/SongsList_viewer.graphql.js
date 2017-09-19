/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type SongsList_viewer = {|
  +songs: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string;
        +book: ?{|
          +name: ?string;
        |};
        +title: ?string;
        +num: ?number;
      |};
    |}>;
    +pageInfo: {|
      +hasNextPage: boolean;
      +endCursor: ?string;
    |};
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "book",
      "type": "String"
    },
    {
      "kind": "RootArgument",
      "name": "lang",
      "type": "String"
    },
    {
      "kind": "RootArgument",
      "name": "order_by",
      "type": "String"
    },
    {
      "kind": "RootArgument",
      "name": "first",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "after",
      "type": "String"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "songs"
        ]
      }
    ]
  },
  "name": "SongsList_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "songs",
      "args": [
        {
          "kind": "Variable",
          "name": "book",
          "variableName": "book",
          "type": "String"
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
      "name": "__Songs_songs_connection",
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
                  "kind": "FragmentSpread",
                  "name": "SongListItem_song",
                  "args": null
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
      "kind": "FragmentSpread",
      "name": "SongListItem_viewer",
      "args": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
