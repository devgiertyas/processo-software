import { Fragment, useEffect, useState } from "react"
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
   } from "reactstrap"
import Header from "components/Headers/Header.js";
import { useNavigate } from "react-router-dom";
import { userHandleGet } from "rules/userRules";

const Users = () => {
  const navigate = useNavigate()
  
  const [listContacts, setListContacts] = useState([])

  useEffect(() => {
    userHandleGet().then(res => {
        setListContacts(res)
    })
  },[])

    return (
    <Fragment>
        <Header/>
      <Container className="mt--7" fluid>
      <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Contatos</h3>
                <Button color="primary" onClick={() => navigate('/admin/contacts/edit')} >Novo Contato</Button>
              </CardHeader>
              <Table className="align-items-center table-flush h-100" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefone</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    listContacts.map(user => {
                      return (
                        <tr>
                        <th scope="row">
                         <span className="mb-0 text-sm">
                          {user.nome}
                          </span>
                        </th>
                        <td>{user.email}</td>
                        <td>54 999-99900</td>
                        <td>
                          <Button onClick={() => navigate(`/admin/contacts/edit/${user.id_usuario}`)} >Editar</Button>
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
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
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