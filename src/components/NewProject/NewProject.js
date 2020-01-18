import React from 'react';
import {
    Link
  } from "react-router-dom";

class NewProject extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
      let value = event.target.value;
  
      this.setState({ title: value });
    }
    handleSubmit(event) {
      event.preventDefault();
  
      this.props.onSubmit(this.state.title);
    }
    render() {
      return (
        <div>
            <Link to="/">GO BACK</Link>
            <form className="column" onSubmit={this.handleSubmit}>
            <label className="header" htmlFor="username">
                {this.props.label}
            </label>
            <input
                id="username"
                placeholder="Github Username"
                type="text"
                value={this.state.username}
                autoComplete="off"
                onChange={this.handleChange}
            />
            <button
                className="button"
                type="submit"
                disabled={!this.state.username}
            >
                Submit
            </button>
            </form>
        </div>
      );
    }
}

export default NewProject;