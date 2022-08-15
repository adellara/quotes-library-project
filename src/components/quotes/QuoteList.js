import { Fragment } from 'react';
import {useHistory,useLocation} from 'react-router-dom'; //change url and save history yg di return
//useLocation give current information of the current URL

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('sort')==='asc' // sort di url adalah key

  const sortedQuotes = sortQuotes(props.quotes,isSortingAscending)

  console.log(location)
  const sortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search:`sort=${(isSortingAscending ? 'desc' : 'asc')}` //key and value
    })
    // history.push(`${location.pathname}?sort=${(isSortingAscending ? 'desc' : 'asc')}`) //rerender the current page
    // after ? itu disimpen di key search 
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingHandler}>Sort {isSortingAscending?'Descending':'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;

//jadi buttonnya tu kalo itemsnya udh ascending, buttonnya jadi desc dan sebaliknya