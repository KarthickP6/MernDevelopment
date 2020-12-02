import React, { Component } from "react"
import { formatCurrency } from "../util"
import Fade from "react-reveal/Fade"
import { connect } from "react-redux"
import { showToCart } from "../redux/productActions"
import { SHOW_CART, SHOW_TO_CART } from "../redux/actionTypes"
class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCheckout: false,
      email: "",
      name: "",
      address: "",
    }
  }

  componentDidMount = () => {
    this.props.showToCart()
  }

  createOrder = (e) => {
    e.preventDefault()
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    }
    this.props.createOrder(order)
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  render() {
    const { cartItem } = this.props
    // console.log(cartItem.length)
    const { cartItems } = this.props
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart
          </div>
        )}
        <div className="cart">
          <Fade left cascade={true}>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    {formatCurrency(item.price)} x {item.qty}{" "}
                    <button
                      className="button"
                      onClick={() => this.props.removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 ? (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce(
                      (accumulator, current) =>
                        accumulator + current.price * current.qty,
                      0
                    )
                  )}
                </div>
                <button
                  onClick={() => {
                    this.setState({ showCheckout: true })
                  }}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            <div>
              {this.state.showCheckout === true ? (
                <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <Fade right cascade={true}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input
                            className="input"
                            name="email"
                            type="email"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            className="input"
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            className="input"
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <button className="button primary" type="submit">
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </Fade>
                  </form>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.productReducer.cartProducts,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showToCart: () => dispatch({ type: SHOW_CART }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
