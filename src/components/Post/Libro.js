import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import './Libro.css';

class Libro extends Component {

    render() {
        let libro = null;
        libro = (
            <article className="Cuadro">
                <Row className="justify-content-md-center pt-3">
                    <Col><h3>{this.props.titulo}</h3></Col>
                </Row>
                <Row className="justify-content-md-center pt-3">
                    <Col><img src={this.props.imagen} alt="Imagen libro" width="200px" ></img></Col>
                </Row>
                <Row className="justify-content-md-center pt-3">
                    <p>{this.props.descripcion}</p>
                </Row>
                <Row className="justify-content-md-center pt-3">
                    <Col><h6>{this.props.autor}</h6></Col>
                </Row>
                <Row className="justify-content-md-center pt-3">
                    <Col><h6>{this.props.precio} €</h6></Col>
                </Row>
                <div className="Info"></div>

            </article>
        )
        return (libro);
    }
}
export default Libro;