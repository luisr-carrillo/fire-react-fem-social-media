import React from 'react';
import Posts from './Posts';
import Authentication from './Authentication';

const Application = () => (
    <main className="Application">
        <h1>Think Piece</h1>
        <Authentication />
        <Posts />
    </main>
);

export default Application;
