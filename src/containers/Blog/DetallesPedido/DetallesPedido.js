import React from 'react';
import { Row } from 'react-bootstrap';

import './DetallesPedido.css';

class DetallesPedido extends React.Component {


    render() {


        let DetallesPedido = "";
        if (this.props.pedido !== undefined) {

            let detalles = [];
            let pedido = this.props.pedido;
            let index = 1;

            while (pedido[index] !== undefined) {
                detalles.push(<Row className="justify-content-md-center pt-2" key={pedido[index].libro}>
                    <p>Libro {pedido[index].libro}, Cantidad {pedido[index].cantidad}
                    </p>
                </Row>);
                index++;
            }


            DetallesPedido = (
                <div className="FullPost">
                    <Row className="justify-content-md-center">
                        <h3>Detalles de la compra: </h3>
                    </Row>
                    {detalles}
                    <Row className="justify-content-md-center">
                        Precio total: {pedido[0].precio} €
                        </Row>
                </div>
            );
        }

        return DetallesPedido;
    }
}

export default DetallesPedido;