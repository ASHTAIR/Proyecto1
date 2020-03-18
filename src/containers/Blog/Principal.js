import React, { Component } from 'react';
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';
import './Principal.css';
import Tienda from './Tienda/Libros';
import MostrarPedidos from './MostrarPedidos/MostrarPedidos';

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                        <li><NavLink
                                to="/Tienda/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Tienda</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/MostrarPedidos',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>Mostrar Pedidos</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/MostrarPedidos" component={MostrarPedidos} />
                    <Route path="/Tienda" component={Tienda} />
                    <Redirect from="/" to="/Tienda" />
                </Switch>
            </div>
        );
    }
}

export default Blog;