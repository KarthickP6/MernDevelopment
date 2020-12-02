import logo from "./logo.svg"
import axios from "axios"
import React from "react"
import "./App.css"
import data from "./data.json"
import Products from "./components/products"
import Filter from "./components/Filter"
import Cart from "./components/Cart"
import { connect } from "react-redux"
import { ADD_CART, REMOVE_CART } from "./redux/actionTypes"
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      size: "",
      sort: "",
      cartItems: [],
    }
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    // this.setState({
    //   cartItems: cartItems.filter((item) => item._id !== product._id),
    // })
    // console.log("Proudct is " + product.id)
    // const url = "http://localhost:5000/cart/removeToCart"
    // axios
    //   .delete(url, { data: { id: product.id } })
    //   .then((res) => {
    //     this.showToCart()
    //   })
    //   .catch((err) => console.log("error is::" + err))
    // console.log("Came inside app removecart")
    this.props.removeCart(product)
  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name)
  }

  showToCart = () => {
    const url2 = "http://localhost:5000/cart/showToCart"
    axios.get(url2).then((res) => {
      this.setState({
        cartItems: res.data,
      })
    })
  }

  addToCart = (product) => {
    // const url = "http://localhost:5000/cart/addToCart"
    // axios.post(url, product).then((res) => {
    //   this.setState({
    //     cartItems: res.data,
    //   })
    // })
    // const cartItems = this.state.cartItems.slice()
    // let alreadyInCart = false
    // cartItems.forEach((item) => {
    //   if (item._id === product._id) {
    //     item.count++
    //     alreadyInCart = true
    //   }
    // })
    // if (!alreadyInCart) {
    //   cartItems.push({ ...product, count: 1 })
    // }
    // console.log("Clicked" + this.state.cartItems.length)
    // this.setState({ cartItems: cartItems })
    this.props.addCart(product)
  }

  componentDidMount = () => {
    const url1 = "http://localhost:5000/cart/"
    axios.get(url1).then((res) => {
      this.setState({
        products: res.data,
      })
    })
    this.showToCart()
  }

  sortProducts = (event) => {
    console.log(event.target.value)
    const sort = event.target.value
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "Lowest"
            ? a.price < b.price
              ? 1
              : -1
            : sort === "Highest"
            ? a.price > b.price
              ? 1
              : -1
            : a._id > b._id
        ),
    }))
  }
  filterProducts = (event) => {
    console.log("Clicked" + event.target.value)
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        product: data.products,
      })
    } else {
      console.log(event.target.value)
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      })
    }
  }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/"> shopping cart </a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart
                createOrder={this.createOrder}
                removeFromCart={this.removeFromCart}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
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
    addCart: (product) => dispatch({ type: ADD_CART, payload: product }),
    removeCart: (product) => dispatch({ type: REMOVE_CART, payload: product }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
