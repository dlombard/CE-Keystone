import React from 'react'
import { Link } from 'found';
import { Layout, Menu, Breadcrumb, Row, Col, Dropdown, Button, Icon } from 'antd';
const { Header } = Layout;
const Item = Menu.Item
import FaBars from 'react-icons/lib/fa/bars'
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            key: this._computeKey(),
        }
    }
    _handleMenuClick = (e) => {
        if (e.key === '1') {
            this.setState({ visible: false });
        }
    }
    _getMenu = () => {

        return (
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[this.state.key]}
                style={{ lineHeight: '64px' }}
                className="mynav"
                onClick={this._handleMenuClick}
            >
                <Item key="1"><Link to="/"><span>Home</span></Link></Item>
                <Item key="2"><Link to="/search"><span>Search</span></Link></Item>
                <Item key="3"><Link to="/"><span>About</span></Link></Item>
                <Item key="4"><Link to="/contact-us"><span>Contact us</span></Link></Item>
            </Menu>
        )

    }

    _computeKey = () => {
        const pathname = this.props.props.location.pathname
        let key = '1'
        if(pathname.includes('search')){
            key = '2'
        }
        if(pathname.includes('about')){
            key = '3'
        }
        if(pathname.includes('contact')){
            key = '4'
        }

        return key
    }
    render() {
        return (
            <Header style={{ width: '100%' }}>
                <Row>
                    <Col className="logo" md={6} xs={20}>
                        <a href="/">
                            <span>Chants d'Espérance</span>
                        </a>
                    </Col>
                    <Col md={18} xs={0}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[this.state.key]}
                            className="mynav"
                            onClick={this._handleMenuClick}
                        >
                            <Item key="1"><Link to="/"><span>Home</span></Link></Item>
                            <Item key="2"><Link to="/search"><span>Search</span></Link></Item>
                            <Item key="3"><Link to="/"><span>About</span></Link></Item>
                            <Item key="4"><Link to="/contact-us"><span>Contact us</span></Link></Item>
                        </Menu>
                    </Col>
                    <Col md={0} xs={4}>
                        <div className="mynav-dropdown">
                            <Dropdown overlay={this._getMenu()} trigger={['click']}>
                                <a className="ant-dropdown-link" href="#">
                                    <FaBars size={30} className="dropdown-icon" />
                                </a>
                            </Dropdown>
                        </div>
                    </Col>

                </Row>
            </Header>

        )
    }
}
