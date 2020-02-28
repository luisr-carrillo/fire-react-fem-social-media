import React from 'react';
import { render } from 'react-dom';

import './index.scss';

import Application from './components/Application';
import { PostsProvider } from './context/PostsProvider';
import { UserProvider } from './context/UserProvider';

render(
    <UserProvider>
        <PostsProvider>
            <Application />
        </PostsProvider>
    </UserProvider>,
    document.getElementById('root')
);
