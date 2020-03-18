import React from 'react';
import axios from '../../../axios';

import './MostrarPedidos.css';

class FullPost extends React.Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate () {
        console.log('/libros/' + this.props.match.params.id)
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.idb !== this.props.match.params.id) ) {
                axios.get('/libros.json?orderBy="$key"&equalTo="' + this.props.match.params.id + '"')
                    .then(response => {
                        console.log(response);
                        const posts = [];
                        for (let key in response.data) {
                            posts.push({
                                ...response.data[key],
                                idb: key
                            });
                        }
                        console.log(posts);
                        this.setState({ loadedPost: posts[0] });
                    });
            }
        }
    }

    deleteUpdatePostHandler = () => {
        console.log('ddddddddddd')
        axios.delete('/posts/' + this.props.match.params.id + '.json')
            .then(response => {
                console.log(response);
            });
        // axios.put('/posts/' + this.props.id + '.json', {
        //     ...this.state.loadedPost,
        //     author: "new author added " + new Date()
        // })
        //     .then(response => {
        //         console.log(response);
        //     });
    }

    render () {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if ( this.props.id ) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if ( this.state.loadedPost ) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deleteUpdatePostHandler} className="Delete">DeleteSSS</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;