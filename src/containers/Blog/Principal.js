import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './Principal.css';
import Tienda from './Tienda/Libros';
import MostrarPedidos from './MostrarPedidos/MostrarPedidos';

class Blog extends Component {

    render() {
        //<Redirect from="/" to="/Tienda" />
        //                    <Route path='/RealizaPedido' component={RealizaPedido} />

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
                            }}>Pedidos</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/MostrarPedidos" component={MostrarPedidos} />
                    <Route path="/Tienda" component={Tienda} />

                </Switch>


            </div>


        );
    }
}

export default Blog;