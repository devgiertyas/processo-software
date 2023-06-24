import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label,Input } from 'reactstrap';
import Select from 'react-select'
import { ModalContext } from "Contexts/ModalContext";
import ModalError from "components/Alerts";
import {messageHandleSend} from '../../rules/messageRules'

const ModalSendMessage = ({isOpen, setIsOpen, contactsSelecteds}) => {
    const { openModal } = useContext(ModalContext);
    const [message, setMessage] = useState('')
    const [subject, setSubject] = useState('')

    const sendTytpeOptions =  [
        { value: 'whatsapp', label: 'WhatsApp', isDisabled: true },
        { value: 'email', label: 'E-mail', isFixed: true},
        { value: 'sms', label: 'SMS', isDisabled: true },
      ];

    const handleSendMessage = async () => {

        if(!subject)
        {
            openModal("Escreva o contéudo da mensagem.")
            return
        }

        if(!message)
        {
            openModal("Escreva o contéudo da mensagem.")
            return
        }

        const payloadMessage = {
          contacts: contactsSelecteds,
          subject: subject,
          text: "teste",
        }

        await messageHandleSend(payloadMessage).then(res => {
          if(res.success)
          {
            setIsOpen(false)
          }
        }).catch((error) => {
          openModal(error.message)
        })

    }


  return (
    <Modal isOpen={isOpen} className='modal-dialog-centered' fade={false} modalClassName="primary"  size='lg'>
        <ModalError/>
      <ModalHeader toggle={() => setIsOpen(false)}>Envio de Mensagem!</ModalHeader>
      <ModalBody className='mt-0 pt-0'>
        <Row>
        <Col  xs="12" xl="12" lg="12" >
            <FormGroup>
              <Label>Contatos Selecionados</Label>
              <Select 
              getOptionLabel={(contact) => contact.nome }
              getOptionValue={(contact) => contact.id_usuario }
              value={contactsSelecteds}
              options={contactsSelecteds} 
              isMulti  
              isDisabled={true}
             />
            </FormGroup>
        </Col>
        <Col  xs="12" xl="12" lg="12" >
            <FormGroup>
              <Label>Modo de Envio</Label>
              <Select 
              options={sendTytpeOptions} 
              isMulti  
              placeholder={""}
              defaultValue={sendTytpeOptions[1]}
             />
            </FormGroup>
        </Col>
        <Col  xs="12" xl="12" lg="12" >
            <FormGroup>
              <Label>Assunto</Label>
                <Input
                className="form-control"
                placeholder="Informe o assunto."
                type="text"
                value={subject}
                onChange={(event) =>setSubject(event.target.value)}
                /> 
            </FormGroup>
        </Col>
        <Col  xs="12" xl="12" lg="12" >
            <FormGroup>
              <Label>Mensagem</Label>
                <Input
                className="form-control"
                placeholder="Escreva o conteúdo da mensagem aqui."
                rows="5"
                type="textarea"
                value={message}
                onChange={(event) =>setMessage(event.target.value)}
                /> 
            </FormGroup>
        </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='d-flex justify-content-center'>
        <Button disabled={true} color="secondary" onClick={() => setIsOpen(false)}>
          Agendar Envio
        </Button>
        <Button color="primary" onClick={() => handleSendMessage()}>
          Enviar Mensagem
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export {ModalSendMessage}
