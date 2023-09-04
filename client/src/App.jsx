import './App.css';

//Here, we import the "Outlet" component, which will helpu us render the components of the current route.
import { Outlet } from 'react-router-dom';

//Here, we import the "Apollo" components necessary for interaction with our GraphQL API.
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Navbar from './components/Navbar';

//Here, we define a "new" instance of the "ApolloClient" that we imported above. We designate the "uri" of the "graphql" server through which our app will access its data. We will manage queries and store them as a "new" instance of the "InMemoryCache" component we imported above.
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

//Here, we give the app the abiity to "return" the contents of the "Navbar" and "Outlet" compnents". We wrap the entire app in an "ApolloProvider", which provides the "ApolloClient" instance to all components in our React app.
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

//Here, we export this code for use elsewhere in our app.
export default App;
