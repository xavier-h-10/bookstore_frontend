import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {checkSession} from "../service/UserService";
import {Modal, Button} from "antd";

export class ChatRoute extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      hasChecked: false,
      showModal: false,
      redirect: false,
    }
  }

  handleAccept = () => {
    this.setState({
      showModal: false,
      redirect: true,
    })
  };

  renderRedirect = () => {
    return this.state.redirect ? (
            <Redirect to={{
              pathname: '/login',
              state: {from: this.props.location}
            }}/>
        ) :
        null;
  };

  renderModalButton = () => {
    return (
        <Button key="submit" type="primary" onClick={this.handleAccept}>
          确认
        </Button>
    )
  };

  renderModal = () => {
    if (this.state.showModal)
      return (
          <Modal title="提示" visible={true} footer={this.renderModalButton()}>
            <p>请先登录，再进入聊天室。</p>
          </Modal>
      );
    else return null;
  };

  checkAuthority = data => {
    console.log(data);
    let isAuthorized = (data.status !=undefined && data.status!=null);
    console.log(isAuthorized);
    if (!isAuthorized) {
      this.setState({showModal: true});
    }
    this.setState({
      isAuthorized: isAuthorized,
      hasChecked: true
    })
  };

  componentDidMount() {
    checkSession(this.checkAuthority);
  }

  render() {
    const {component: Component, path = "/", exact = false, strict = false} = this.props;

    if (!this.state.hasChecked) return null;

    return <Route path={path} exact={exact} strict={strict} render={props => (
        this.state.isAuthorized ? (
            <Component {...props}/>
        ) : (
            <div>
              {this.renderModal()}
              {this.renderRedirect()}
            </div>
        )
    )}/>
  }
}

export default ChatRoute;
