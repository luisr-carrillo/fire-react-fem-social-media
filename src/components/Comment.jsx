import React from 'react';

import moment from 'moment';

const Comment = ({ comment, user, createdAt }) => (
    <article className="Comment">
        <span className="Comment--author">{user.displayName}</span>
        <span className="Comment--content">{comment}</span>
        <span className="Comment--timestamp">
            {moment(createdAt.toDate()).calendar()}
        </span>
    </article>
);

export default Comment;
