import React, { useState } from 'react';
import BucketForm from './BucketForm';
import Bucket from './Bucket';

function BucketList() {
  const [bucket, setBucket] = useState([]);

  // Function to add a bucket list item
  const addBucketItem = (item) => {
    console.log(
      '🚀 Manage your financial tactics!',
      item
    );
    
    if (!item.text) {
      return;
    }
    const newBucket = [item, ...bucket];
    console.log(newBucket);

    // Call setBucket to update state with our new set of bucket list items
    setBucket(newBucket);
  };

  // Function to mark bucket list item as complete
  const completeBucketItem = (id) => {
    
    let updatedBucket = bucket.map((item) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });

    console.log(updatedBucket);
    setBucket(updatedBucket);
  };

  // Function to remove bucket list item and update state
  const removeBucketItem = (id) => {
    const updatedBucket = [...bucket].filter((item) => item.id !== id);

    setBucket(updatedBucket);
  };

  // Function to edit the bucket list item
  const editBucketItem = (itemId, newValue) => {
    
    if (!newValue.text) {
      return;
    }

      setBucket((prev) =>
      prev.map((item) => (item.id === itemId ? newValue : item))
    );
  };

  return (
    <div>
      <h1>📺 Daily Plan for Trading</h1>
      <p>Welcome to Goldenpiggy Crypto</p>
      <p><br></br></p>
      
      


      <BucketForm onSubmit={addBucketItem} />
      <Bucket
        bucket={bucket}
        completeBucketItem={completeBucketItem}
        removeBucketItem={removeBucketItem}
        editBucketItem={editBucketItem}
        
      ></Bucket>
      <p><br></br></p>


     

     <a class="goldenpiggyEnter" a href="https://goldenpiggy.herokuapp.com/" id="BTN">Enter Goldenpiggy 🚀</a>
     
  
   
     
     <p><br></br><br></br></p>
    </div>
  );
}




export default BucketList;
