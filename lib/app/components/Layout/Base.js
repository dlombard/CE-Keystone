import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Layout } from 'antd';
const { Footer, Sider, Content } = Layout;
import Header from './Header'

class Base extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillUpdate() {
        if (window.ga) {
            console.log('ga')
            window.ga('send', 'pageview', location.pathname);
        }
    }
    componentDidMount() {
        if (window.ga) {
            console.log('ga')
            window.ga('send', 'pageview', location.pathname);
        }
    }
    render() {
        var path = this.props.location.pathname;
        var segment = path.split('/')[1] || 'root';
        const { children } = this.props;
        return (
            <div className="wrapper">
                <Layout className='base'>
                    <Header props={this.props} >Header</Header>
                    <Content>
                        <ReactCSSTransitionGroup
                            transitionName="example"
                            transitionAppear={true}
                        >
                            <div className="content">
                                {children && (<div>{React.cloneElement(children, { key: this.props.location.pathname })} </div>)}
                            </div>
                        </ReactCSSTransitionGroup>
                    </Content>
                    <Footer> Cesperance ©2017 Created by Dlo</Footer>
                </Layout>

            </div>
        );
    }

}

export default Base;
