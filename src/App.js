import React from "react";
import Nav from "./Nav";
import ItemPage from "./ItemPage";
import { items } from "./static-data";
import CartPage from "./CartPage";
import "./App.css";

class App extends React.Component {
  state = {
    activeTab: 0,
    cart: []
  };

  handleTabChange = index => {
    this.setState({
      activeTab: index
    });
  };

  handleAddToCart = item => {
    this.setState({
      cart: [...this.state.cart, item.id] //We only store the ids of the products in the cart
    });
  };

  handleRemoveOne = item => {
    let index = this.state.cart.indexOf(item.id);
    this.setState({
      cart: [...this.state.cart.slice(0, index), ...this.state.cart.slice(index + 1)]
    });
  };

  renderContent() {
    switch (this.state.activeTab) {
      default:
      case 0:
        return <ItemPage items={items} onAddToCart={this.handleAddToCart} />;
      case 1:
        return this.renderCart();
    }
  }

  renderCart() {
    // Count how many of each item is in the cart
    let itemsCount = this.state.cart.reduce((itemsCount, itemId) => {
      itemsCount[itemId] = itemsCount[itemId] || 0; //The itemid here is a key
      itemsCount[itemId]++;
      return itemsCount;
    }, {});

    // Create an array of items
    let cartItems = Object.keys(itemsCount).map(itemId => {
      //Find the item by its id
      let item = items.find(item => item.id === parseInt(itemId, 10));

      return {
        ...item,
        count: itemsCount[itemId]
      };
    });

    return <CartPage items={cartItems} onAddOne={this.handleAddToCart} onRemoveOne={this.handleRemoveOne} />;
  }

  render() {
    let { activeTab } = this.state;

    return (
      <div className="App">
        <Nav activeTab={activeTab} onTabChange={this.handleTabChange} />
        <main className="App-content">{this.renderContent()}</main>
        {/* <div>{this.state.cart.length} items</div> */}
      </div>
    );
  }
}

export default App;
