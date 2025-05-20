import React, {useEffect, useState} from 'react';
import '../styles/App.css'
import {usePosts} from "../hooks/usePost";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyLoader from "../components/UI/Loader/MyLoader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import {getPageCount} from "../utils/pages";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";


function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [fetchPosts, isPostsLoading, error] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPageCount(totalCount, limit));
    })
    useEffect(() => {
        fetchPosts()
        console.log(page)
    }, [page])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page);
    }


    return (
        <div className="App">
            <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>Create post</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter} />
            {error &&
                <h1>There is an error: {error}</h1>}
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><MyLoader /></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Posts about Java'} />
            }
            <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
        </div>
    );
}

export default Posts;
