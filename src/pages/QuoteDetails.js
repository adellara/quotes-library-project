import { Fragment, useEffect } from "react";
import { useParams, Route, Link,useRouteMatch } from "react-router-dom";
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";


import Comments from '../components/comments/Comments'
import LoadingSpinner from "../components/UI/LoadingSpinner";

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
    { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
];

const QuoteDetails = () => {
    const match = useRouteMatch()
    const params = useParams() //di simpennya namanya di quotesId

    const {quoteId} = params
    const {sendRequest,status, data:loadedQuote, error}= useHttp(getSingleQuote,true)

    useEffect(()=> {
        sendRequest(quoteId)
    },[sendRequest,quoteId])

    if (status==='pending'){
        return <div className="centered">
            <LoadingSpinner/>
        </div>
    }

    if (error){
        return <p className="centered">{error}</p>
    }

    if (!loadedQuote.text){
        return <p>No Quote Found</p>
    }

    return <Fragment>
        <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
        <Route path={match.path} exact>
            <div className='centered'>
                <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
            </div>
        </Route>
        <Route path={`${match.path}/comments`}>
            <Comments />
        </Route>
    </Fragment>
}

//Untuk yang nested routes
//jadi kalo pathnya gaada comments, dia nampilin itu
// kalo pathnya ada comments dia nampilin comments

// Kalo useRouteMatch itu untuk kan kalo misalnya dia ganti urlnya ngaruh di banyak tempat, useRoute mempermudah
{/*  dari gini : <Route path={`/quotes/${params.quoteId}/comments`}></Route>
jadi gini : <Route path={`${match.path}/comments`}></Route> */}
//match.url karena nyimpen value yg dibutuhin
export default QuoteDetails;