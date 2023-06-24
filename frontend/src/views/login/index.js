import { Fragment, useState, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import { ModalContext } from "Contexts/ModalContext";
import ModalError from 'components/Alerts'
import { userHandleLogin } from "rules/userRules";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { openModal } = useContext(ModalContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async() => {
    
      if(!email && !password)
      {
        openModal('Por favor, informe o email e a senha.');
        return;
      }

      const user = await userHandleLogin(email, password)

      if(!user)
      {
        openModal('Email ou senha incorretos.');
        return;
      }
      else{
        localStorage.setItem("userLogged", user.email)
        navigate("/admin/contacts");
      }    
  }

  return (
    <Fragment>
      <ModalError/>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Senha"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={() => handleLogin()}>
                  Entrar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
      </Fragment>
  );
};

export default Login;
