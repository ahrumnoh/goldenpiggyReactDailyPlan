import React, { useState } from 'react';

function BucketForm(props) {
  const [input, setInput] = useState('');
  let [eagerness, setEagerness] = useState('');

  const eagernessLevel = ['Urgent', 'Soso', 'Later']

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!eagerness) {
      eagerness = 'Later';
    }

    props.onSubmit({
      id: Math.random(Math.floor() * 1000),
      text: input,
      eagerness: eagerness,
    });

    setInput('');
    setEagerness('');
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };


  return !props.edit ? (
    <div>
      <form className="bucket-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add to your Daily Plans"
          value={input}
          name="text"
          className="bucket-input"
          onChange={handleChange}
        ></input>
        <div className="dropdown">
          <button className={`dropbtn ${eagerness}`}>
            {eagerness || 'Priority'}
          </button>
          <div className="dropdown-content">
            <p onClick={() => setEagerness(eagernessLevel[0])}>Urgent</p>
            <p onClick={() => setEagerness(eagernessLevel[1])}>Soso</p>
            <p onClick={() => setEagerness(eagernessLevel[2])}>Later</p>
          </div>
        </div>
        <button className="bucket-button">Add plans </button>
      </form>
    </div>
  ) : (
    <div>
      <h3>Update entry: {props.edit.value}</h3>
      <form className="bucket-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={props.edit.value}
          value={input}
          name="text"
          className="bucket-input"
          onChange={handleChange}
        ></input>
        <div className="dropdown">
          <button className={`dropbtn ${eagerness}`}>
            {eagerness || 'Priority'}
          </button>
          <div className="dropdown-content">
            <p onClick={() => setEagerness(eagernessLevel[0])}>Urgent</p>
            <p onClick={() => setEagerness(eagernessLevel[1])}>Soso</p>
            <p onClick={() => setEagerness(eagernessLevel[2])}>Later</p>
          </div>
        </div>
        <button className="bucket-button">Change</button>
      </form>
    </div>
  );
}



  

export default BucketForm;
