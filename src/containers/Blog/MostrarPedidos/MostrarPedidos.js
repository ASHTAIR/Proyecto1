import React from 'react';
import axios from '../../../axios';
//de Full post
import './MostrarPedidos.css';
import Pedido from '../Pedidos/Pedido';
import { Row, Button, Modal, Container } from 'react-bootstrap';
import Detalles from '../DetallesPedido/DetallesPedido';

class MostrarPedidos extends React.Component {
    state = {
        loadedPost: null,
        pedidos: [],
        selectedPedidoId: null,
        indicehandler: null,
        confirmacion: false,
        show: false,
        setShow: false,
    }

    componentDidMount() {
        axios.get('/Pedidos.json')
            .then(response => {
                let pedidos = [];
                for (let key in response.data) {
                    pedidos.push({
                        ...response.data[key],
                        idb: key,
                    });
                }
                pedidos = pedidos.slice(0, 3);
                this.setState({ pedidos: pedidos });
            }).catch(error => {
                this.setState({ error: true });
            });
    }

    pedidoSelectedHandler = (id) => {
        let estado = this.state.pedidos;
        this.props.history.push('/MostrarPedidos/' + id);
        for (let index = 0; index < estado.length; index++) {
            if (estado[index].idb === id) {
                this.setState({ indicehandler: index });
            }
        }
        this.setState({ selectedPedidoId: id });
    }

    anularpedido = (id) => {
        let estado = this.state.pedidos;
        for (let index = 0; index < estado.length; index++) {
            if (estado[index].idb === id) {
                estado[index][0].anulado = true;
                id = estado[index].idb;
            }
        }

        axios.put('/Pedidos.json', estado)
            .then(response => {
                alert("Estamos enviando a nuestros mejores asesinos para anular el pedido");
                this.props.history.push('/MostrarPedidos');

            });
    }


    
    render() {

        let ventana = null;

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
                                <Row className="justify-content-md-center">
                                    <h6>¿Deseas cancelar el pedido?</h6>
                                </Row>

                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>
                                Cancelar
                            </Button>
                            <Button className="bt-danger" onClick={() => this.handleform()}>
                                Anular
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>

            );
        }

        let pedidos = null;
        if (!this.state.formulario) {
            pedidos = this.state.pedidos.map(pedido => {
                return <article key={pedido.idb}>
                    <Row className="justify-content-md-center pt-2">
                        <Pedido
                            pedido={pedido}
                            clicked={() => this.pedidoSelectedHandler(pedido.idb)}
                        />
                    </Row>
                    <Row className="justify-content-md-center pt-2">
                        <Button onClick={() => this.anularpedido(pedido.idb)} variant="btn btn-primary">Anular pedido</Button>
                    </Row>
                </article>
            });
        }

        return (
            <article>
                <section>
                    {pedidos}
                </section>
                <section></section>
                <section>
                    <Detalles pedido={this.state.pedidos[this.state.indicehandler]}/>
                </section>
            </article>
        );
    }
}

export default MostrarPedidos;