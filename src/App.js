import { Route, Switch,Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetails from "./pages/QuoteDetails";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <div>
      <Layout>
      <Switch>
          <Route path='/' exact>
            <Redirect to='/quotes' />
          </Route>
          <Route path='/quotes' exact>
            <AllQuotes/>
          </Route>
          <Route path='/quotes/:quoteId'>
            <QuoteDetails />
          </Route>
          <Route path='/new-quote'>
            <NewQuote/>
          </Route>
          <Route path='*'>
            <NotFound/>
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

//* make every path match with path with star value

export default App;
