import React, { Component } from 'react';
 import  axios  from '../../axios';
 import Post from "../../components/Post/Post";
 import './posts.css';

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
      this.setState({ selectedPostID: id });
   }
   render() {
      let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
      if (!this.state.error) {
         posts = this.state.posts.map(data => {
            return <Post key={data.id} title={data.title} author={data.author} clicked={() => this.clickHandler(data.id)} />
         })
      }
      return (
         <div>
            <section className="Posts">
               {posts}
            </section>
         </div>
      );
   }
}

export default Posts;