import Login from "views/login";
import Icons from "views/examples/Icons.js";
import Users from "views/users";
import UsersEdit from "views/users/AddUsers";
import ContactsEdit from "views/contacts/AddContacts";
import Contacts from 'views/contacts'

var routes = [
    {
    path: "/contacts",
    name: "Contatos",
    icon: "ni ni-circle-08 text-primary",
    component: <Contacts />,
    layout: "/admin",
    },
    {
      path: "/contacts/edit",
      component: <ContactsEdit />,
      layout: "/admin",
    },
    {
      path: "/contacts/edit/:id",
      component: <ContactsEdit />,
      layout: "/admin",
    },
    {
    path: "/users",
    name: "Usuarios",
    icon: "ni ni-single-02 text-info",
    component: <Users />,
    layout: "/admin",
  },
  {
    path: "/users/edit",
    component: <UsersEdit />,
    layout: "/admin",
  },
  {
    path: "/users/edit/:id",
    component: <UsersEdit />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
];
export default routes;
