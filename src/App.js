import React, { useEffect, useState } from "react";
import "./style.css";
import supabase from "./supabase";
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

function NewFactForm({ setFacts, facts }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength1 = text.length;
  const textLength2 = source.length;

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      text &&
      isValidUrl(source) &&
      category &&
      textLength1 <= 200 &&
      textLength2 <= 100
    ) {
      /* const newFact = {
        id: Math.random() * 1000,
        text,
        source,
        category,
        votesInteresting: 0,
        votes_like: 0,
        votes_dislike: 0,
        votes_amazing: 0,
        createdIn: new Date().getFullYear(),
      }; */

      //Uplaoading a fact
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();

      if (!error) setFacts((facts) => [newFact[0], ...facts]); // Update the facts state with the new fact
      setText("");
      setSource("");
      setCategory("");
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <span>{200 - textLength1}</span>
      <input
        value={text}
        type="text"
        placeholder="Share your Knowledge here.."
        onChange={(e) => setText(e.target.value)}
      />
      <span>{100 - textLength2}</span>
      <input
        value={source}
        type="text"
        placeholder="Share trustworthy source's link too :)"
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn_ball btnlarge">Let's Submit!</button>
    </form>
  );
}

function isValidUrl(url) {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return urlPattern.test(url);
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");

  //displays the fact list from the databse
  useEffect(
    function () {
      async function getfacts() {
        let query = supabase.from("facts").select("*");
        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: facts, error } = await query

          //.eq("category", "tech") //Method to Filter out the category and show only technology category facts
          .order("votes_like", { ascending: false }) //Shows data in descending order(Z-A)/(100-1)
          .limit(1000);
        setFacts(facts);
        if (!error) setFacts(facts);
        else alert("Problem Encountered for Loading Facts 😕");
      }
      getfacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Head showForm={showForm} setShowForm={setShowForm} />
      {showForm && <NewFactForm setFacts={setFacts} facts={facts} />}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        <FactList facts={facts} setFacts={setFacts} />
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
        <h1>Here are some Ineteresting Facts</h1>
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

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside className="btn">
      <ul>
        <li className="category">
          <button className="btn_all" onClick={() => setCurrentCategory("all")}>
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0)
    return (
      <p>
        No facts about this category found in the database 😕. Wanna create the
        first one?😍
      </p> //show a message when no facts are found in the database
    );
  //You can also show a loading spinner or an error message here
  //If you want to show the facts in descending order, you can add another useEffect hook here to update the facts state when the currentCategory changes.  //The useEffect hook should depend on the currentCategory state.  //This way, the component will only update when the currentCategory changes, and the database query will only be executed when the currentCategory changes.  //Also, you can add a button to sort the facts in ascending order based on the number of votes.  //You can add a button to filter the facts by the current year.  //You can add a button to filter the facts by the current month.  //You can add a button to filter the facts by the current day.  //You can add a button to filter the facts by the current hour

  return (
    <section>
      <ul className="fact_list_">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} fact(s) in the database</p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  async function handleVote(columName) {
    // Update the fact in the database
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columName]: fact[columName] + 1 })
      .eq("id", fact.id)
      .select();
    if (!error)
      setFacts((fact) =>
        fact.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }
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
        <button className="butt1" onClick={() => handleVote("votes_like")}>
          👍 <strong>{fact.votes_like}</strong>
        </button>
        <button className="butt2" onClick={() => handleVote("votes_dislike")}>
          👎 <strong>{fact.votes_dislike}</strong>
        </button>
        <button className="butt3" onClick={() => handleVote("votes_amazing")}>
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
