import React, { PureComponent } from 'react';
import { Layout, Row, Col, Button } from 'antd'
import { webDB } from '../../Stitch'

const { Content, Header, Footer } = Layout
export default class Base extends PureComponent {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      fieldsLoaded: false
    }
  }

  componentWillMount() {
    webDB.collection('site').find({ page: 'home' }).first().then((doc) => {
      if (doc) {
        let fields = doc.fields
        this.setState({
          fieldsLoaded: true,
          fields
        })
      }

    }).catch((err) => {
      return err
    })
  }
  render() {
    return (
      <div>
        < Layout style={{ backgroundColor: '#2343e5' }}>
          <Header style={{ backgroundColor: '#2343e5' }} />
          <Content >
            <div className="main-content gradient">

              {this.state.fieldsLoaded ?
                <div className="sub-1">
                <p>{this.props.navigator}</p>
                  <Row className="text-description">
                    <h2 style={{ color: 'white', }}>{this.state.fields.main_text.en}</h2>
                    <h3 style={{ color: 'white', }}>{this.state.fields.sub_main_text.en}</h3>
                  </Row>
                  <Row className="sub-content" justify="center" type="flex">
                    <Col md={12} className="description buttons">

                      <Row justify="center" type="flex">
                        <a className="google" href='https://play.google.com/store/apps/details?id=com.ce_react&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png' /></a>
                      </Row>

                      <Row justify="center" type="flex">
                        <a className="access-button" href='https://cesperance.com'><img alt='Accéder au site' src='https://res.cloudinary.com/dgpgwfwfv/image/upload/v1549431432/Artboard_q1twn0.png' /></a>

                      </Row>


                    </Col>

                    <Col md={12} >
                      <Row justify="center" type="flex">
                        <a href="https://cesperance.com">
                          <img src="https://res.cloudinary.com/dgpgwfwfv/image/upload/v1549431716/Pixel_3_White_FRONT_ty8r1e.png" width='80%' />

                        </a>
                      </Row>
                    </Col>
                  </Row>
                </div>
                :
                <br />
              }
            </div>

          </Content>
          <Footer />
        </Layout >
      </div>
    );
  }
}

