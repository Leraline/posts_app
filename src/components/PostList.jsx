import React from 'react';
import PostItem from './PostItem';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const PostList = ({posts, title, remove}) => {

	if(!posts.length) {
		return(
			<h1 style={{textAlign: 'center'}}>
				No posts today...
			</h1>
		)
	}

    return (
        <div className='App'>
			<h1 style={{textAlign: 'center'}}>
				{title}
			</h1>
			<TransitionGroup>
			{posts.map((post, index) => 
			<CSSTransition
				key={post.id}
				timeout={500}
				classNames="post"
			>
				<PostItem remove={remove} number={index + 1} post={post} key={post}/>
			</CSSTransition>
			)}
			</TransitionGroup>
		</div>
    );
};

export default PostList;