import { Fragment, useContext, useEffect, useState } from "react"
import {   
    Card,
    CardHeader,
    CardFooter,
    Button,
    Container,
    Row,
    CardBody,
    Col,
    Input,
    Label,
    FormGroup
   } from "reactstrap"
import Header from "components/Headers/Header.js";
import { useNavigate, useParams } from "react-router-dom";
import ModalError from 'components/Alerts'
import { ModalContext } from "Contexts/ModalContext";
import { userHandleCreate, userHandleGetUser, userHandleUpdate } from "rules/userRules";
import { toast } from 'react-toastify';

const UsersEdit = () => {
  const { openModal } = useContext(ModalContext);
    const navigate = useNavigate()

    const {id} = useParams()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
      if(parseInt(id))
      {

        userHandleGetUser(parseInt(id)).then(
          res => {
            setEmail(res.email)
            setName(res.nome)
          }
        )
      }
    },[id])

    const handleSaveUser = async () => {  
      if(!name)
      {
        openModal('Por favor, informe o nome');
        return;
      }
      if(!email)
      {
        openModal('Por favor, informe o email');
        return;
      }
      if(!password && !id)
      {
        openModal('Por favor, informe a senha');
        return;
      }
      if(password !== confirmPassword && !id)
      {
        openModal('As senhas não coincidem.');
        return;
      }
      if(parseInt(id))
      {
        userHandleUpdate(parseInt(id), name, email).then(() => {
          navigate("/admin/users")
          toast.success('Salvo com sucesso!', { autoClose: 3000 });
        })
      }
      else
      {     
        userHandleCreate(name, email, password).then((response) => {
          navigate("/admin/users")
          toast.success('Salvo com sucesso!', { autoClose: 3000 });
        }).catch((error) => {
          openModal(error.message)
        }

       )
      }
    }

    return (
    <Fragment>
      <ModalError/>
        <Header/>
      <Container className="mt--7" fluid>
      <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0"> {id ? 'Edição' : 'Cadastro'} de Usuários</h3>
              </CardHeader>
              <CardBody>
                <Row>
                 <Col xs="12" xl="12" lg="12" >
                   <FormGroup>
                    <Label>
                      Nome
                    </Label>
                    <Input 
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Informe o nome"/>
                   </FormGroup>
                 </Col>
                 <Col xs="12" xl="12" lg="12">
                   <FormGroup>
                    <Label>
                      E-mail
                    </Label>
                    <Input 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Informe o email"
                    type="email"/>
                   </FormGroup>
                 </Col>
                 {!id && (
                  <Fragment>
                 <Col xs="12" xl="12" lg="12">
                   <FormGroup>
                    <Label>
                      Senha
                    </Label>
                    <Input 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="Informe a senha"/>
                   </FormGroup>
                 </Col>
                 <Col xs="12" xl="12" lg="12">
                   <FormGroup>
                    <Label>
                      Confirmação Senha
                    </Label>
                    <Input 
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirme a senha"/>
                   </FormGroup>
                 </Col>
                 </Fragment>
                 )}
                </Row>
              </CardBody>
              <CardFooter className="py-4">
              <Button color="secondary" outline onClick={() =>  navigate("/admin/users")} >Voltar</Button>
              <Button color="primary" onClick={() =>  handleSaveUser()} >Salvar</Button>
              </CardFooter>
            </Card>
          </div>
        </Row>

      </Container>
    </Fragment>
    )

}


export default UsersEdit