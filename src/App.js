import { useState } from "react";
import "./index.css";

// const iItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

function App() {
  const [newItems, setnewItems] = useState([]);

  function setnewarr(newItem) {
    setnewItems([...newItems, newItem]);
  }
  function handledelete(id) {
    setnewItems(newItems.filter((item) => id !== item.id));
  }
  function oncheck(id) {
    setnewItems(
      newItems.map((item) =>
        id === item.id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function resetfun() {
    setnewItems([]);
  }

  return (
    <div className="app">
      <Logo></Logo>
      <Form onsetnewarr={setnewarr}></Form>
      <PackingList
        items={newItems}
        handledelete={handledelete}
        oncheck={oncheck}
        resetfun={resetfun}
      ></PackingList>
      <Stats items={newItems}></Stats>
    </div>
  );
}

function Logo() {
  return (
    <div className="logo-container">
      <h1>Pack Mate</h1>
      <h6>Never miss an item when you travel!</h6>
    </div>
  );
}

function Form({ onsetnewarr }) {
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function handlesubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    onsetnewarr(newItem);

    setdescription("");
    setquantity(1);
  }

  return (
    <form className="add-form" onSubmit={handlesubmit}>
      <h3>what do you need for trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setquantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, handledelete, oncheck, resetfun }) {
  return (
    <div className="list">
      <ul>
        {items.map((items) => {
          return (
            <Items
              itemp={items}
              key={items.id}
              handledelete={handledelete}
              oncheck={oncheck}
            ></Items>
          );
        })}
      </ul>
      <div className="actions">
        <button onClick={resetfun}>Reset</button>
      </div>
    </div>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const notpacked = items.filter((item) => item.packed === false).length;

  const per =
    numItems > 0 ? Math.round(((numItems - notpacked) / numItems) * 100) : 0;
  if (items.length === 0)
    return (
      <footer className="stats">Start adding items for your trip...!</footer>
    );
  return (
    <footer className="stats">
      {per === 100 ? (
        <span>All packed you are ready for your trip...!</span>
      ) : (
        <span>
          Total items:{numItems} Yet to pack:{notpacked} ({per}%)
        </span>
      )}
    </footer>
  );
}

function Items({ itemp, handledelete, oncheck }) {
  console.log(itemp.packed);
  return (
    <li>
      <input
        type="checkbox"
        value={itemp.packed}
        onChange={() => oncheck(itemp.id)}
      ></input>
      <span style={itemp.packed ? { textDecoration: "line-through" } : {}}>
        {itemp.quantity} {itemp.description}
      </span>
      <button onClick={() => handledelete(itemp.id)}>&times;</button>
    </li>
  );
}
export default App;
