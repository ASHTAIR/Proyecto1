import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

import './Pedido.css';

class Pedido extends Component {

    render() {
        let pedido = null;
        let estado = "";

        if (this.props.pedido[0].anulado) {
            estado = "Cancelado";
        } else {
            estado = "En curso";
        }

        pedido = (
            <Row className="bg-light" onClick={this.props.clicked}>
                <Col className="justify-content-md-center pt-3">
                    <Row><h3>Cliente:</h3></Row> 
                    <Row> {this.props.pedido[0].cliente}</Row>
                </Col>
                <Col className="justify-content-md-center pt-3">
                    <Row><h6>Dirección:</h6></Row> 
                    <Row>{this.props.pedido[0].direccion}</Row>
                </Col>
                <Col className="justify-content-md-center pt-3">
                    <Row><h6>Código postal:</h6> {this.props.pedido[0].postal}</Row>
                </Col>
                <Col className="justify-content-md-center pt-3">
                    <h6>Precio total:</h6> {this.props.pedido[0].precio} €
                </Col>
                <Col className="justify-content-md-center pt-3">
                    <h6>Estado: </h6>{estado}
                </Col>
                <div className="Info"></div>

            </Row>
        );

        return pedido;
    }
}
export default Pedido;