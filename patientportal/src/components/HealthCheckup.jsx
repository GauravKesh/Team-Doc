// import React from 'react'
import React, { useState ,useEffect} from 'react';
import Response from './Response';

export default function HealthCheckup() {
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
  const [roleAi, setRoleAi] = useState("Doctor");
  const [currentTitle, setCurrentTitle] = useState(null);
  const role = "Doctor";
  const prompt = `As a ${role} , provide information on ${
    (
    formData.age,
    formData.gender,
    formData.height,
    formData.weight,
    formData.pastHealthCondition,
    formData.presentHealthCondition,
    formData.smoke,
    formData.diet,
    formData.regularCheckup)
  }  patient medical and background and daily activity suggest a daily  routine and precautions and consult the patient with medicine 
    *** please answer in a heading and paragraph with organised manner so the template is  
     daily routine:- , supplements:- , excercies:- , diet:- answer just for these things only {write these all things by new line}`;
// const prompt = `As a ${role} , provide information on ${
//     (formData.name,
//     formData.age,
//     formData.gender,
//     formData.height,
//     formData.weight,
//     formData.pastHealthCondition,
//     formData.presentHealthCondition,
//     formData.smoke,
//     formData.diet,
//     formData.regularCheckup)
//   }  patient medical and background and daily activity suggest a daily  routine and precautions and consult the patient with medicine 
//     *** please answer in a heading and paragraph with organised manner so the template is  
//      daily routine:- , supplements:- , excercies:- , diet:- answer just for these things only {write these all things by new line}`;

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
    console.log(
      `Patient :- ${
        (
        formData.age,
        formData.gender,
        formData.height,
        formData.weight,
        formData.pastHealthCondition,
        formData.presentHealthCondition,
        formData.smoke,
        formData.diet,
        formData.regularCheckup)
      }`
    );
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
          role: "Patient",
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
    <div className="flex flex-row justify-self-center space-x-2">
      <h2 className="flex justify-center ">Health Information Form </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Height:
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Weight:
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Present Health Condition:
          <textarea
            name="presentHealthCondition"
            value={formData.presentHealthCondition}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Past Health Condition:
          <textarea
            name="pastHealthCondition"
            value={formData.pastHealthCondition}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Do you smoke?
          <input
            type="checkbox"
            name="smoke"
            checked={formData.smoke}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Veg or Non-Veg?
          <input
            type="text"
            name="diet"
            value={formData.diet}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Do you take medication?
          <input
            type="checkbox"
            name="medication"
            checked={formData.medication}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Any regular checkup?
          <input
            type="checkbox"
            name="regularCheckup"
            checked={formData.regularCheckup}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" onClick={getmessage}>
          Submit
        </button>
      </form>
      <section className="main">
        {!currentTitle && <h1>Team Doc</h1>}
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
}
