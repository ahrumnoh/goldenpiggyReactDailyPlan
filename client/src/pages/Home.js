import React from 'react';
import { useQuery } from '@apollo/client';

import NewsList from '../components/NewsList'; //*NewsList
import NewsForm from '../components/NewsForm';  //*NewsForm

import { QUERY_NEWS } from '../utils/queries'; //*QUERY_NEWS

const Home = () => {
  const { loading, data } = useQuery(QUERY_NEWS); //*QUERY_NEWS
  const newss = data?.newss || []; //* newss

  return (
    <main>
      <div className="flex-row justify-center">
      
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        > 
          <NewsForm />   
        </div> 
        
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            
            <NewsList
              newss={newss}
              title="Global Financial NEWS" 
            />
          )}  
        </div>
      </div> 
    </main> //* <NewsForm> <NewsList>
  );
};

export default Home;
