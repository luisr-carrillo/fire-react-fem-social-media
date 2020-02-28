import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';

import Application from './components/Application';
import { PostsProvider } from './context/PostsProvider';
import { UserProvider } from './context/UserProvider';

render(
    <Router>
        <UserProvider>
            <PostsProvider>
                <Application />
            </PostsProvider>
        </UserProvider>
    </Router>,
    document.getElementById('root')
);
