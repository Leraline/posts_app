// eslint-disable-next-line quotes
import React, {useEffect, useState} from 'react';
import '../styles/App.css'
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/Mymodal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../components/hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../components/hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
// import Counter from './components/Counter';

function Posts() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data);
		const totalCount = response.headers['x-total-count']
		setTotalPages(getPageCount(totalCount, limit))
	})

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	useEffect(() => {
		fetchPosts()
	}, [page])


	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	const changePage = (page) => {
		setPage(page)
	}

	return (
		<div className='App'>
			<MyButton onClick={fetchPosts}>GET POSTS</MyButton>
			<MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
				Add post
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost}/>
			</MyModal>
			<hr style={{margin: '15px 0'}}/>
			<PostFilter 
				filter={filter}
				setFilter={setFilter}
			/>
			{postError &&
				<h1>Mistakes were made {postError}</h1>

			}
			{isPostsLoading
				? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
				: <PostList remove={removePost} posts={sortedAndSearchedPosts} title='JS posts'/>

			}
			<Pagination 
				page={page} 
				changePage={changePage} 
				totalPages={totalPages}
			/>
		</div>
	);
}


export default Posts;