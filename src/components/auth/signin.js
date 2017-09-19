import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import * as actions from '../../actions';

const renderInput = field => {
    const { input, type } = field;
    return (
        <div>
            <input {...input} type={type} className="form-control" />
        </div>
    );
}

class Signin extends Component {

    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email, password });
        this.props.authenticated?
        this.props.history.push("/observation/list"):null


    }
    isAuthenticated(){
      const loggedIn= this.props.authenticated;
      if(loggedIn){
        console.log("history",this.props.history)
        this.props.closeModal?this.props.closeModal():null
      }
    }

    renderAlert() {
        const { errorMessage } = this.props;
        if (errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong>{errorMessage}
                </div>
            );
        }
    }


    render(){
        const { handleSubmit } = this.props;
        return (
            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

                <div className="form-group">
                    <label>Email:</label>
                    <Field name="email"
                        type="email" component={renderInput} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <Field name="password"
                        type="password" component={renderInput} />
                </div>
                {this.isAuthenticated()}
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
         authenticated: state.auth.authenticated
     };
}

Signin = reduxForm({
 form: 'signin'
})(Signin);
export default  connect(mapStateToProps, actions)(Signin);