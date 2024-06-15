import { useState, useEffect, useRef } from "react";
import FlashcardList from "./component/FlashcardList";
import axios from "axios";
import "./App.css";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();

  async function fetchData(url, params) {
    const response = await axios.get(url, { params: params });
    console.log("Fetch data: ", response.data);

    const data = response.data.results.map((questionItem, index) => {
      const answer = decodeString(questionItem.correct_answer);
      const options = [...questionItem.incorrect_answers, answer].map(
        (option) => decodeString(option)
      );
      return {
        id: `${index}-${Date.now()}`,
        question: decodeString(questionItem.question),
        answer: answer,
        options: options.sort(() => Math.random() - 0.5),
      };
    });
    setFlashcards(data);
  }

  // Execute if click the submit button
  function handleSubmit(e) {
    e.preventDefault();
    fetchData("https://opentdb.com/api.php", {
      amount: amountEl.current.value,
      category: categoryEl.current.value,
    });
  }

  // Fetch categories
  useEffect(() => {
    async function fetch() {
      const response = await axios.get("https://opentdb.com/api_category.php");
      console.log("Fetch categories", response.data);
      setCategories(response.data.trivia_categories);
    }
    fetch();
  }, []);

  return (
    <>
      {/* Form */}
      <form className="header" onSubmit={handleSubmit}>
        {/* Categories */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {/* Amount */}
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            min={1}
            step={1}
            ref={amountEl}
            defaultValue={10}
          />
        </div>
        {/* Submut button */}
        <div className="form-group">
          <button type="submit" className="btn">
            Generate
          </button>
        </div>
      </form>

      {/* Flashcards */}
      <div className="App container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;

function decodeString(str) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
}
