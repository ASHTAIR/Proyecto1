import React, { Component } from 'react';
import axios from '../../../axios';
import { Redirect } from 'react-router-dom';
import { Button, Row, Col, Form, Modal, Container } from 'react-bootstrap';

import Libro from '../../../components/Post/Libro';
import './Libros.css';

class Libros extends Component {
    state = {
        libros: [],
        total: 0,
        show: false,
        setShow: false,
        formulario: false,
        Nombre: "",
        Apellidos: "",
        direccion: "",
        postal: "",
        tarjeta: ""
    }

    handleClose = () => this.setState({ setShow: false });
    handleShow = () => this.setState({ setShow: true });

    handleform() {
        this.setState({
            setShow: false,
            formulario: true
        });

    }

    handleNombre = (nombre) => {
        this.setState({ Nombre: nombre });
    }

    handleApellidos = (apellidos) => {
        this.setState({ Apellidos: apellidos });
    }

    handledireccion = (dir) => {
        this.setState({ direccion: dir });
    }

    handlepostal = (postal) => {
        this.setState({ postal: postal });
    }

    handletarjeta = (tar) => {
        this.setState({ tarjeta: tar });
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

    detallespedido = () => {
        let p = [];
        for (let index = 0; index < this.state.libros.length; index++) {
            if (this.state.libros[index].cantidad > 0) {
                p.push(<Row className="justify-content-md-center pt-2" key={this.state.libros[index].nombre}>
                    <p>Libro {this.state.libros[index].nombre}, Cantidad {this.state.libros[index].cantidad}-----
                    Precio/unidad {this.state.libros[index].precio} €/u
                    </p>
                </Row>);
            }
        }
        return p;
    }

    pedidoDataHandler = () => {
        var data = [{
            anulado: false,
            cliente: this.state.Nombre + " " + this.state.Apellidos,
            direccion: this.state.direccion,
            postal: this.state.postal,
            tarjeta: this.state.tarjeta,
            precio: this.state.total,
        }];

        this.setState({ submitted: true });

        for (let index = 0; index < this.state.libros.length; index++) {
            if (this.state.libros[index].cantidad > 0) {
                data.push({
                    libro: this.state.libros[index].nombre,
                    cantidad: this.state.libros[index].cantidad,
                });
            }

        }
        console.log(data);
        
        axios.post('/Pedidos.json', data)
            .then(response => {
                alert('Pedido guardado');
                console.log(response);
                this.props.history.push('/Tienda');
            });
            
    }

    render() {
        let libros = null;
        if (!this.state.formulario) {
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

        let ventana = null;

        if (!this.state.formulario) {
            ventana = (
                <article>
                    <Row className="justify-content-md-center pt-3">
                        <h3>Total del pedido: {this.state.total} €</h3>
                    </Row>
                    <Row className="justify-content-md-center pt-3">
                        <Button onClick={() => this.handleShow()} variant="btn btn-primary">Realizar Pedido</Button>
                    </Row>
                </article>
            );
        }

        if (this.state.setShow) {
            ventana = (
                <Row className="justify-content-md-center">
                    <Button onClick={() => this.handleShow()} variant="btn btn-primary">Realizar Pedido</Button>

                    <Modal show={this.state.setShow} onHide={() => this.handleClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title><h4>Resumen de la compra</h4></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                {this.detallespedido()}
                                <Row className="justify-content-md-center">
                                    <h6>Total compra: {this.state.total} €</h6>
                                </Row>

                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>
                                Cancelar
                            </Button>
                            <Button onClick={() => this.handleform()}>
                                Comprar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>

            );
        }


        let formulario = null;
        let redirect = null;

        if (this.state.submitted) {
            redirect = <Redirect to="/MostrarPedidos" />;
        }
        if (this.state.formulario) {
            formulario = (
                <div className="NewPost">
                    {redirect}
                    <Row className="justify-content-md-center pt-3">
                        <h3>Finaliza tu pedido</h3>
                    </Row>
                    <Row>
                        <Col>
                            <label>Nombre</label>
                            <input type="text" value={this.state.Nombre} onChange={(event) => this.handleNombre(event.target.value)} />
                        </Col>
                        <Col>
                            <label>Apellidos</label>
                            <input type="text" value={this.state.Apellidos} onChange={(event) => this.handleApellidos(event.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Dirección de envío</label>
                            <input type="text" value={this.state.direccion} onChange={(event) => this.handledireccion(event.target.value)} />
                        </Col>
                        <Col>
                            <label>Código postal</label>
                            <input type="text" value={this.state.postal} onChange={(event) => this.handlepostal(event.target.value)} />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center pt-3">
                        <Col >
                            <label>Número de tarjeta</label>
                            <input type="text" value={this.state.tarjeta} onChange={(event) => this.handletarjeta(event.target.value)} />
                        </Col>
                    </Row>
                    <button onClick={this.pedidoDataHandler}>Realizar pedido</button>
                </div>
            );
        }

        return (
            <article>
                <Row>
                    <section className="Posts">
                        {libros}
                    </section>
                </Row>
                <Row className="justify-content-md-center">
                    {ventana}
                </Row>
                <Row>
                    {formulario}
                </Row>
            </article>

        );
    }
}

export default Libros;