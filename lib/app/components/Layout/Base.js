import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './Header'

class Base extends React.Component {

    render() {
        var path = this.props.location.pathname;
        var segment = path.split('/')[1] || 'root';

        return (
            <div className="wrapper">
                <Header />

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                >
                    <div className="content">
                        {React.cloneElement(this.props.children, { key: segment })}
                    </div>
                </ReactCSSTransitionGroup>

            </div>
        );
    }

}

export default Base;
