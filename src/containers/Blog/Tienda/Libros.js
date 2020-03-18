import React, { Component } from 'react';
import axios from '../../../axios';
import { Route, Link } from 'react-router-dom';
import { Button, Row, Col, Form } from 'react-bootstrap';

import Libro from '../../../components/Post/Libro';
import './Libros.css';
import MostrarPedidos from '../MostrarPedidos/MostrarPedidos';
import RealizaPedido from '../RealizaPedido/RealizaPedido';

class Libros extends Component {
    state = {
        libros: [],
        total: 0
    }

    componentDidMount() {
        axios.get('/Libros.json')
            .then(response => {
                let libros = [];
                for (let key in response.data) {
                    libros.push({
                        ...response.data[key],
                        idb: key,
                        cantidad: 0
                    });
                }
                libros = libros.slice(0, 3);
                //console.log(libros);
                this.setState({ libros: libros });
            }).catch(error => {
                this.setState({ error: true });
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push('/Tienda/' + id);
    }

    incrementa = (id) => {
        let estado = this.state.libros;
        let precio = 0;
        for (let index = 0; index < estado.length; index++) {
            if (estado[index].nombre === id) {
                estado[index].cantidad++;
                precio = estado[index].precio;
            }

        }
        //console.log(precio);
        //console.log(this.state.total);

        this.setState({
            carrito: estado,
            total: eval(this.state.total) + eval(precio),
        });
    }

    decrementa = (id) => {
        let estado = this.state.libros;
        let precio = 0;
        for (let index = 0; index < estado.length; index++) {
            if (estado[index].nombre === id) {
                estado[index].cantidad--;
                precio = estado[index].precio;
                if (estado[index].cantidad < 0) {
                    estado[index].cantidad = 0;
                    precio = 0;
                }
            }
        }

        this.setState({
            carrito: estado,
            total: eval(this.state.total) - eval(precio),
        });
    }

    pedidoDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };
        let pedido = null;
        for (let index = 0; index < this.state.libros.length; index++) {
            if (this.state.libros[index].cantidad > 0) {
                pedido = pedido + <p>{this.state.libros[index].nombre}, Cantidad: this.state.libros[index].cantidad}</p>
            }

        }
        /*
        axios.post('/posts.json', data)
            .then(response => {


<Modal>
                    <div className="modal" tabindex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Resumen de compra</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Aquí va tu pedido</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary">Realizar pedido</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>



                console.log(response);
                this.setState( { submitted: true } );
                this.props.history.push('/posts');
            });
            */
    }

    render() {
        let libros = <p style={{ textAlign: 'center' }}>Algo ha ido mal...</p>;
        if (!this.state.error) {
            libros = this.state.libros.map(libro => {
                return <article key={libro.idb}><Libro
                    titulo={libro.nombre}
                    imagen={libro.imagen}
                    autor={libro.autor}
                    cantidad={libro.cantidad}
                    precio={libro.precio}
                    descripcion={libro.descripcion}
                    clicked={() => this.postSelectedHandler(libro.idb)}
                />
                    <Row className="justify-content-md-center pt-2">
                        <Col xs={2} className="justify-content-md-right">
                            <Button onClick={() => this.decrementa(libro.idb)} variant="btn btn-primary">-</Button>
                        </Col>
                        <Col xs={3} className="justify-content-md-center">
                            <Form>
                                <Form.Group controlId="numero">
                                    <Form.Control type="input" value={libro.cantidad} readOnly />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col xs={2} className="justify-content-md-left">
                            <Button onClick={() => this.incrementa(libro.idb)} variant="btn btn-primary">+</Button>

                        </Col>
                    </Row>
                </article>
            });
        }

        return (
            <article>
                <Row>
                    <section className="Posts">
                        {libros}
                    </section>
                    <Route path={this.props.match.url + '/:id'} exact component={RealizaPedido} />
                </Row>
                <Row className="justify-content-md-center pt-5">
                    <h3>Total del pedido: {this.state.total}</h3>
                </Row>
                <Row className="justify-content-md-center pt-5">
                    <Link to={{
                        pathname: '/RealizaPedido',
                        hash: '#submit',
                        search: '?quick-submit=true'
                    }}><Button>Realizar Pedido</Button>
                    </Link>
                    <Route path="/RealizaPedido" component={RealizaPedido} />
                </Row>
            </article>
        );
    }
}

export default Libros;