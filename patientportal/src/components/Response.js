import { useState, useEffect } from "react";
import "../style/response.css";

const Response = () => {
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        presentHealthCondition: "",
        pastHealthCondition: "",
        smoke: false,
        diet: "",
        medication: false,
        regularCheckup: false,
      });

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: type === "checkbox" ? checked : value,
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, e.g., send data to backend
        console.log(formData);
      };
  const [previousChats, setPreviousChats] = useState([]);
  const [userQuestion, setUserQuestion] = useState(null);
  const [airesponse, setAiresponse] = useState(null);
  const [roleAi, setRoleAi] = useState("Sex Educator");
  const [currentTitle, setCurrentTitle] = useState(null);
  const role = "Doctor";
  // const prompt = `As a ${role} , provide information on ${userQuestion} in a proper explanation and if the userQuestion is asked in bad way correct it and make it a good response and Highlight the changes are with bold and red color and make things understandable also write answer in paragraph and when you introduce yourself just  start the answer in new line`
  const prompt = `As a ${role} , provide information on ${formData}  patient medical and background and daily activity suggest a daily  routine and precautions and consult the patient with medicine 
    *** please answer in a heading and paragraph with organised manner so the template is  
     daily routine:- , supplements:- , excercies:- , diet:- answer just for these things only {write these all things by new line}`;

  // asking  a new question
  const createNewQuestion = () => {
    setUserQuestion("");
    setAiresponse(null);
    setCurrentTitle(null);
    alert("new chat started");
  };
  const handlClick = (uniqueTittle) => {
    setAiresponse(null);
    setUserQuestion(null);
    setCurrentTitle(uniqueTittle);
  };
  const getmessage = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: prompt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch("http://localhost:3005/api", options);
      const data = await response.json();
      // getting the response from AI
      let aiContent = data.choices[0].message.content;
      // saving the AI Response
      setAiresponse(aiContent);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Log the message whenever it changes
    console.log(currentTitle);
    console.log(`student :- ${userQuestion}`);
    console.log(`${roleAi} :- ${airesponse}`);

    if (!currentTitle && userQuestion && airesponse) {
      // modifying the tittle of the asked question
      setCurrentTitle(userQuestion);
    }
    if (currentTitle && userQuestion && airesponse) {
      // modifying the chats of the user
      setPreviousChats((previousChats) => [
        ...previousChats,
        {
          title: currentTitle,
          role:"Patient",
          content: userQuestion,
        },
        {
          title: currentTitle,
          role: roleAi,
          content: airesponse,
        },
      ]);
    }
  }, [airesponse, currentTitle]);
  const currentUserChat = previousChats.filter(
    (previousChats) => previousChats.title === currentTitle
  );
  const uniqueTittle = Array.from(
    new Set(previousChats.map((previousChats) => previousChats.title))
  );
  // console.log(uniqueTittle)
  // console.log(previousChats)

  return (
    <div className="app">
      <section className="side-bar">
        <button className="newchat" onClick={createNewQuestion}>
          + New userQuestion
        </button>
        <ul className="history">
          {uniqueTittle?.map((uniqueTittle, index) => (
            <li
              key={index}
              className="userTittle"
              onClick={() => handlClick(uniqueTittle)}
            >
              {uniqueTittle}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made By Team SociAi</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>Team SociAI</h1>}
        <ul className="feed">
          {currentUserChat?.map((userChatMessage, index) => (
            <li key={index}>
              <p className="role">{userChatMessage.role}</p>
              <p className="aiMessage">{userChatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              className="userInput"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
            />
            <div id="submit" onClick={getmessage}>
              ➢
            </div>
          </div>
          <p className="info">
            This will help you to Clarify your userQuestion
          </p>
        </div>
      </section>
    </div>
  );
};

export default Response;
