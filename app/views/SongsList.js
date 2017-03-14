import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'

class SongsList extends React.Component {
    render() {
        const { viewer } = this.props;

        return (
            <div>
                {viewer.songs.map((song) =>
                    <div key={song.id}>
                        <span>{`${song.num} ${song.title}`}</span>
                        <br />
                        <span dangerouslySetInnerHTML={{ __html: song.lyrics_Markdown.html }}></span>
                        <br />
                        <br />
                    </div>
                )
                }
            </div>)
    }
}


export default Relay.createContainer(SongsList,
    {
        initialVariables: { book: "MJ" },
        prepareVariables: (prevVariables) => {
            return { book: _.upperCase(prevVariables.book) }

        },
        fragments: {

            viewer: () => Relay.QL`
    fragment on Viewer {
      
                    songs(book: $book){
                        
                id
          title
          num
          lyrics_Markdown{
              md
              html
          }
          
          }
      

    }
  `
        }
    }
)
