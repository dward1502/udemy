import React, { Component } from 'react';
import './Blog.css';
import Posts from '../Posts/Posts';
import { Route, NavLink, Switch } from "react-router-dom";
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
                            activeStyle={{color:'blue', textDecoration:'underline'}}>Home</NavLink></li>
                                
                            <li><NavLink to={{
                                pathname:'/new-post',
                                hash:'#submit',
                                search:'?quick-submit=true'}}>New Post</NavLink ></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path='/' exact render={() => <h1>Home</h1>}/> */}
                <Switch>
                    <Route path='/new-post' component={NewPost} />
                    <Route path='/' component={Posts} />
                    
                   
                </Switch>
               
                
            </div>
        );
    }
}

export default Blog;