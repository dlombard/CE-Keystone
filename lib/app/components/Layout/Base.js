import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './Header'

class Base extends React.Component {

    render() {

        return (
            <div className="wrapper">
                <Header />

                <ReactCSSTransitionGroup
                    component="section"
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <div className="content">
                        {React.cloneElement(this.props.children, {
                            key: this.props.location.pathname
                        })}
                    </div>
                </ReactCSSTransitionGroup>
                
            </div>
        );
    }

}

export default Base;
