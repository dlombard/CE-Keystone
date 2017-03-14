import React from 'react'
import NavLink from '../components/NavLink'

export default React.createClass({
    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/songs/be">Songs</NavLink></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
})