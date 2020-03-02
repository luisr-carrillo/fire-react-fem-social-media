import React from 'react';
import { UserContext } from '../context/UserProvider';

const getDisplayName = (WrappedComponent) =>
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

const withUser = (Component) => {
    const WrappedComponent = (props) => (
        <UserContext.Consumer>
            {(user) => <Component user={user} {...props} />}
        </UserContext.Consumer>
    );

    WrappedComponent.displayName = `withUser(${getDisplayName(
        WrappedComponent
    )})`;

    return WrappedComponent;
};

export default withUser;
