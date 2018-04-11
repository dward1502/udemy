import React, { Component } from 'react';
import './Blog.css';
import Posts from '../Posts/Posts';
import { Route, NavLink } from "react-router-dom";
import NewPost from '../NewPost/NewPost';


class Blog extends Component {
    render () {              
        return (
            <div>
                <header className='Blog'>
                    <nav>
                        <ul>
                            <li><NavLink 
                            to='/' 
                            exact
                            activeClassName='my-active'
                            activeStyle={{color:'blue'}}>Home</NavLink></li>
                                <li><NavLink to='/new-post'>New Post</NavLink ></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path='/' exact render={() => <h1>Home</h1>}/> */}
                <Route path='/' exact component={Posts}/>
                <Route path='/new-post' exact component={NewPost} />
            </div>
        );
    }
}

export default Blog;