import React from 'react'
import {
  createRefetchContainer,
  createFragmentContainer,
  graphql,
  QueryRenderer
} from 'react-relay'

import { lowerCase, upperCase } from 'lodash'
import { Row, Col, Layout, Menu, Icon } from 'antd';
import { Grid, Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import classNames from 'classnames'
import Link from 'found/lib/Link'

class SongListItem extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { song } = this.props
    return (
      <ListGroupItem className={this.props.bookClass} key={song.id}>
        <Link to={`${this.props.location.pathname}/id/${song.id}`}>
          <span>{`${song.num}. ${song.title}`}</span>
        </Link>
      </ListGroupItem>
    )

  }
}

export default createFragmentContainer(SongListItem, {
  viewer: graphql`
    fragment SongListItem_viewer on Viewer {
      id
    }
  `,
  song: graphql`
    fragment SongListItem_song on Song {

        id
        num
        title
        book{
          name 
          abbrv
        }

      
    }
  `,
});