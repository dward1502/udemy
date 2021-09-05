import { useState } from 'react';
import {buildFeedbackPath,extractFeedback} from '../api/feedback';

function  FeedbackPage(props) {
    const [data,setData] = useState()
    function loadFeedbackHandler(id) {
        fetch('/api/' + id).then(response => response.json()).then(data => {
            setData(data.feedback)
        })
    }
  return (
    <ul>
      {props.feedBackItems.map((item) => (
        <li key={item.id}>{item.text} <button onClick={loadFeedbackHandler.bind(null,item.id)}>Show Details</button></li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
   const filePath = buildFeedbackPath()
   const data = extractFeedback(filePath)
   return {
       props:{
           feedBackItems:data
       }
   }
}
export default FeedbackPage;
