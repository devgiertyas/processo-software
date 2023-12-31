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
import { ModalContext } from "Contexts/ModalContext";
import ModalError from "components/Alerts";
import Cleave from "cleave.js/react";
import 'cleave.js/dist/addons/cleave-phone.br'
import { contactHandleGetContact, contactHandleCreate,contactHandleUpdate } from "rules/contactRules";
import { toast } from 'react-toastify';

const ContactsEdit = () => {
    const { openModal } = useContext(ModalContext);
    const navigate = useNavigate()

    const {id} = useParams()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
      if(parseInt(id))
      {

        contactHandleGetContact(parseInt(id)).then(
          res => {
            setEmail(res.email)
            setName(res.nome)
            setPhone(res.celular)
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

      if(!phone)
      {
        openModal('Por favor, informe o telefone');
        return;
      }
   
      if(parseInt(id))
      {
        contactHandleUpdate(parseInt(id), name, email).then(() => {
          toast.success('Salvo com sucesso!', { autoClose: 3000 });
          navigate("/admin/contacts")
        })
      }
      else
      {     
        contactHandleCreate(name, email, phone).then(() => {
          toast.success('Salvo com sucesso!', { autoClose: 3000 });
          navigate("/admin/contacts")
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
                <h3 className="mb-0"> {id ? 'Edição' : 'Cadastro'} de Contatos</h3>
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
                 <Col xs="12" xl="12" lg="12">
                   <FormGroup>
                    <Label>
                      Telefone
                    </Label>
                    <Cleave
                    placeholder="Informe o telefone"
                    options={{ phone: true, phoneRegionCode: 'BR' }}
                    value={phone}
                    onChange={e => setPhone(e.target.rawValue)}
                    className="form-control"/>
                   </FormGroup>
                 </Col>
                </Row>
              </CardBody>
              <CardFooter className="py-4">
              <Button color="secondary" outline onClick={() =>  navigate("/admin/contacts")} >Voltar</Button>
              <Button color="primary" onClick={() =>  handleSaveUser()} >Salvar</Button>
              </CardFooter>
            </Card>
          </div>
        </Row>

      </Container>
    </Fragment>
    )

}


export default ContactsEdit