import React from 'react';
import axios from 'axios';
// import config from '../../../server/config.js';
import { Button, Form, Grid, Header, Image, List, Modal, Icon, Message, Segment } from 'semantic-ui-react'




class LogIn extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
    `}</style>
    return (
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <img className="login-logo" src="./assets/flame-logo.png" />
            <Header as='h1' color='instagram' textAlign='center'>
                <div className="login-logo-name" > InstaLawa </div>
           </Header>
            <Form size='large'>
              <Segment stacked>
                <input
                  placeholder='Email'
                  ref={(input) => { this.email = input }}
                  className="login-input"
                />


                <Button color='instagram' onClick={(e) => {this.props.logIn(this.email)}} fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>
              <Modal size="tiny" trigger={<Button>Sign Up</Button>} closeIcon>
              <Modal.Header>Welcome to <span className="modal-logo"> InstaLawa!</span></Modal.Header>
              <Modal.Content>
                <Form>
                <Segment stacked>
                <input placeholder='Enter your email' ref={i => {this.newEmail = i }} />
                <input placeholder='Enter your username' ref={i => {this.newUsername = i}} />
              </Segment>
                    <Modal size="mini" trigger={<Button type="submit" id="signUp" onClick={e => { this.props.signUp([this.newEmail, this.newUsername]) }}>Let's get started</Button>}>
                       <Grid textAlign="center">
                       <Button color="green" style={{width: '100%'}}><Icon name="checkmark" />You're all set!</Button>
                       </Grid>
                    </Modal>
              </Form>
              </Modal.Content>
            </Modal>
            </Message>
          </Grid.Column>
        </Grid>
      </div>


    );
  }
}

export default LogIn;

