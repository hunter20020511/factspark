import { useState } from "react";
import "./style.css";
import React from "react";
const initialFacts = [
  {
    id: 1,
    text: "react is a React component",
    source: "www.facebook.com/react",
    category: "society",
    votesInteresting: 20,
    votes_like: 18,
    votes_dislike: 5,
    votes_amazing: 13,
  },
];
const CATEGORIES = [
  { name: "technology", color: "#ff0000" },
  { name: "society", color: "#528f19" },
  { name: "politics", color: "#d4681a" },
  { name: "entertainment", color: "#800080" },
  { name: "science", color: "#dda0dd" },
  { name: "history", color: "#6495ed" },
  { name: "health", color: "#00ffff" },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Head showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <NewFactForm /> : null}

      <main className="main">
        <CategoryFilter />
        <FactList />
        <Counter />
      </main>
    </>
  );
}
function Head({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img
          src="bulb.png"
          className="bulb"
          height="140"
          width="140"
          alt="Image of logo"
        />
        <h1>Get ready to blow your mind!</h1>
      </div>
      <button
        className="btn_ball btnlarge btn_open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "CLOSE" : "WANNA share a fact?"}
      </button>
    </header>
  );
}
function isValidUrl(url) {
  // Regular expression pattern for URL validation
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // Protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // Domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // Query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // Fragment locator

  // Return true if the URL matches the pattern, otherwise return false
  return urlPattern.test(url);
}

function NewFactForm() {
  const [text, setText] = useState(""); // State for the text input
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength1 = text.length;
  const textLength2 = text.length;
  function handlingSubmit(e) {
    e.preventDefault();

    if (
      text &&
      isValidUrl(source) &&
      category &&
      textLength1 <= 200 &&
      textLength2 <= 100
    ) {
      const newFact = {
        id: Math.random() * 1000,
        text,
        source,
        category,
        votesInteresting: 0,
        votes_like: 0,
        votes_dislike: 0,
        votes_amazing: 0,
        createdIn: Date.now(),
      };
      initialFacts.push(newFact);
      setText("");
      setSource("");
      setCategory("");
    }
  }
  return (
    <form className="form" onSubmit={handlingSubmit}>
      <span>{200 - textLength1}</span>
      <input
        value={source}
        type="text"
        placeholder="Share your Knowledge here.."
        onChange={(e) => setSource(e.target.value)}
      />
      <span>{100 - textLength2}</span>
      <input
        value={text}
        type="text"
        placeholder="Share trustworthy source's link too :)"
        onChange={(e) => setText(e.target.value)} // State for the text input
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category</option>
        {CATEGORIES.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn_ball btnlarge">Lets Submit!</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside className="btn">
      <ul>
        <li className="category">
          <button className="btn_all"> All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button className="btn" style={{ backgroundColor: cat.color }}>
              {" "}
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList() {
  return (
    <section>
      <ul className="fact_list_">
        {initialFacts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>There are {Fact.length} fact(s) in the database</p>
    </section>
  );
}

function Fact({ fact }) {
  const category = CATEGORIES.find((element) => element.name === fact.category);
  const backgroundColor = category ? category.color : "transparent";

  return (
    <li className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          (source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        {fact.category}
      </span>

      <div className="buttons">
        <button className="butt1">
          👍 <strong>{fact.votes_like}</strong>
        </button>
        <button className="butt2">
          👎 <strong>{fact.votes_dislike}</strong>
        </button>
        <button className="butt3">
          🤩 <strong>{fact.votes_amazing}</strong>
        </button>
      </div>
    </li>
  );
}
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {count}
      <button className="butt1" onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;
