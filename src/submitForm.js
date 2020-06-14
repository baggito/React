import React, {Component} from 'react';
import axios from 'axios';

class SubmitForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {},
            errors: {},
            formLength: 4
        };
    }

    // Make a POST request to /send_report endpoint
    formSubmit = (e) => {
        e.preventDefault();
        // Log the values of the form during form submission
        console.log(this.state.form);
        // POST request
        axios
            .post(
                "send_report",
                this.state.form
            )
            .then(response => {
                if(response.status === 200) {
                    console.log("Success!")
                } else {
                    console.log(response.data);
                }
            })
            .catch(e => console.log(e.response));
    };

    isFormValid = () => {
        // Check if there is no error and all form's fields are validated and put in state
        return Object.keys(this.state.errors).length === 0 &&
            Object.keys(this.state.form).length === this.state.formLength;
    };

    validateForm = () => {
        // copy of errors object
        let errors = Object.assign({}, this.state.errors);
        // Regex to validate phone number
        let validPhoneRegex = /^[1-9]\d{9}$/; // 10 digits phone number
        // Regex to validate email
        let validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        Object.keys(this.state.form).forEach(key => {
            let value = this.state.form[key];

            if(key === "name") {
                if (!value.length) {
                    errors.name = "Name is incorrect";
                } else {
                    delete errors.name;
                }
            } else if (key === "phone") {
                if (!validPhoneRegex.test(value)) {
                    errors.phone = "Phone is incorrect";
                } else {
                    delete errors.phone;
                }
            } else if (key === "email") {
                if (!validEmailRegex.test(value)) {
                    errors.email = "Email is incorrect"
                } else {
                    delete errors.email;
                }
            } else if (key === "msg") {
                if (!value.length) {
                    errors.msg = "Message is incorrect"
                } else {
                    delete errors.msg;
                }
            }
        });
        //console.log(errors);

        this.setState({errors: errors});
    };

    handleFormChange = (name, value) => {
        this.setState({form : {
                ...this.state.form,
                [name]: value
            }}, () => {
            this.validateForm();
        })
    };

    render() {
        return (
            <form>
                <div className="Form-container">
                    <div className="Form-title-container">Report a Problem</div>
                    <div className="Name-input-container">
                        <span className="Name-input-label">Your Name</span>
                        <span className="Error-msg">{this.state.errors.name}</span>
                        <input
                            onChange={(e) => this.handleFormChange(e.target.name, e.target.value)}
                            type="text"
                            className="Name-input"
                            name="name"/>
                    </div>

                    <div className="Phone-input-container">
                        <span className="Phone-input-label">Phone Number</span>
                        <span className="Error-msg">{this.state.errors.phone}</span>
                        <input
                            onChange={(e) => this.handleFormChange(e.target.name, e.target.value)}
                            type="text"
                            className="Phone-input"
                            name="phone"/>
                    </div>

                    <div className="Email-input-container">
                        <span className="Email-input-label">Email</span>
                        <span className="Error-msg">{this.state.errors.email}</span>
                        <input
                            onChange={(e) => this.handleFormChange(e.target.name, e.target.value)}
                            type="text"
                            className="Email-input"
                            name="email"/>
                    </div>

                    <div className="Msg-input-container">
                        <span className="Msg-input-label">Message</span>
                        <span className="Error-msg">{this.state.errors.msg}</span>
                        <textarea onChange={(e) => this.handleFormChange(e.target.name, e.target.value)}
                                  className="Msg-input"
                                  name="msg">
                        </textarea>
                    </div>

                    <button disabled={!this.isFormValid()}
                            type="submit"
                            onClick={e => this.formSubmit(e)}
                            className={!this.isFormValid() ? "Form-submit-disabled" : "Form-submit"} ></button>
                </div>
            </form>
        );
    }
}

export default SubmitForm;