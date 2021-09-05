import { useRef, useState } from 'react';

function HomePage() {
  const [feedBackItems, setFeedbackItems] = useState();
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitForm(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form>
        <div>
          <label htmlFor='email'>Your email address</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback</label>
          <textarea id='feedback' row='5' ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
        <hr />
        <button onClick={loadFeedbackHandler}>Load Feedback</button>
        <ul>
          {feedBackItems.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default HomePage;
