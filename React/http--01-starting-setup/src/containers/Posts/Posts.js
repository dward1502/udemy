import React, { Component } from 'react';
 import  axios  from '../../axios';
 import Post from "../../components/Post/Post";
 import './posts.css';
 import { Route } from "react-router-dom";
//  import {Link} from 'react-router-dom';
import FullPost from './../FullPost/FullPost';

class Posts extends Component {
   state = {
      posts: [],

   }
   componentDidMount() {
      console.log(this.props);
      axios.get('/posts')
         .then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
               return {
                  ...post,
                  author: 'Dan'
               }
            });
            this.setState({ posts: updatedPosts })
            console.log(response);
         }).catch(error => {
             console.log(error);
         });
   }

   clickHandler = (id) => {
    //   this.setState({ selectedPostID: id });
      //programaticly go through route, when a function is completed or initiated goes to a route
      this.props.history.push({pathname:'/'+id});
   }
   render() {
      let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
      if (!this.state.error) {
         posts = this.state.posts.map(data => {
            return (
                // <Link to={'/' + data.id} key={data.id}>
                <Post 
                key={data.id}
                title={data.title} 
                author={data.author} 
                clicked={() => this.clickHandler(data.id)} />
            // </Link>
        );
         })
      }
      return (
         <div>
            <section className="Posts">
               {posts}
            </section>
            <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
         </div>
      );
   }
}

export default Posts;