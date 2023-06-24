import { Fragment, useEffect, useState,useContext } from "react"
import {   
    Card,
    CardHeader,
    CardFooter,
    Button,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Input,
   } from "reactstrap"
import Header from "components/Headers/Header.js";
import { useNavigate } from "react-router-dom";
import { contactHandleGet } from "rules/contactRules";
import { ModalContext } from "Contexts/ModalContext";
import ModalError from "components/Alerts";
import { ModalSendMessage } from "components/ModalSengMessage";

const Users = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate()
  
  const [listContacts, setListContacts] = useState([])

  useEffect(() => {
    contactHandleGet().then(res => {
        setListContacts(res)
    })
  },[])

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openSendMessage, setOpenSendMessage] = useState(false);

  const toggleRowSelection = (contact) => {
    let updatedSelectedRows = [...selectedRows];
    const index = updatedSelectedRows.findIndex((row) => row.id_contato === contact.id_contato);
    if (index !== -1) {
      updatedSelectedRows.splice(index, 1);
    } else {
      updatedSelectedRows.push(contact);
    }
    setSelectedRows(updatedSelectedRows);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...listContacts]);
    }
    setSelectAll(!selectAll);
  };

   const handleSendMessage = () => {

    if(selectedRows.length === 0)
    {
     openModal("Nenhum contato selecionado.")   
     return
    }

    setOpenSendMessage(true)

   }

    return (
    <Fragment>
        <ModalError/>
        <ModalSendMessage isOpen={openSendMessage} setIsOpen={setOpenSendMessage} contactsSelecteds={selectedRows} />
        <Header/>
      <Container className="mt--7" fluid>
      <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Contatos</h3>
                <div>
                <Button color="primary" onClick={() => handleSendMessage()}>Enviar Mensagem</Button>
                <Button color="primary" onClick={() => navigate('/admin/contacts/edit')} >Novo Contato</Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush h-100" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"> 
                    <Input
                        className="ml-1"
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                    />
                    </th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefone</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    listContacts.map(contact => {
                      return (
                        <tr key={contact.id_contato}>
                        <th>
                          <input
                            className="ml-1"
                            type="checkbox"
                            checked={selectedRows.some((row) => row.id_contato === contact.id_contato)}
                            onChange={() => toggleRowSelection(contact)}
                          />
                        </th>   
                        <th scope="row">
                         <span className="mb-0 text-sm">
                          {contact.nome}
                          </span>
                        </th>
                        <td>{contact.email}</td>
                        <td>{contact.celular}</td>
                        <td>
                          <Button onClick={() => navigate(`/admin/contacts/edit/${contact.id_contato}`)} >Editar</Button>
                        </td>
                      </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
      </Row>
      </Container>
    </Fragment>
    )

}


export default Users