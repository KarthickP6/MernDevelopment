import React, { Component } from "react"
import { formatCurrency } from "../util"
import Fade from "react-reveal/Fade"
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom"
import { connect } from "react-redux"
import { fetch } from "../redux/productActions"
import { FETCH, FETCH_PRODUCTS } from "../redux/actionTypes"
class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: null,
    }
  }

  componentDidMount = () => {
    this.props.fetchProduct()
  }
  openModal = (product) => {
    this.setState({
      product: product,
    })
  }

  closeModal = () => {
    this.setState({
      product: null,
    })
  }
  render() {
    const { products } = this.props
    const { product } = this.state
    return (
      <div>
        <Fade bottom cascade={true}>
          {this.props.products === null ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => {
                return (
                  <li key={product._id}>
                    <div className="product">
                      <a
                        href={"#" + product._id}
                        onClick={() => this.openModal(product)}
                      >
                        <img src={product.image} alt={product.title}></img>
                        <p>{product.title}</p>
                      </a>
                      <div className="product-price">
                        {formatCurrency(product.price)}
                      </div>
                      <button
                        onClick={() => this.props.addToCart(product)}
                        className="button primary"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </Fade>
        {this.state.product !== null ? (
          <Modal isOpen={true}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                X
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available Sizes:{" "}
                    {product.availableSizes.map((item) => {
                      return (
                        <span>
                          {" "}
                          <button className="button">{item}</button>
                        </span>
                      )
                    })}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product)
                        this.closeModal()
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        ) : (
          ""
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: () => dispatch({ type: FETCH }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
