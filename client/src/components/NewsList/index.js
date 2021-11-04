import React from 'react';
import { Link } from 'react-router-dom';

const NewsList = ({  //* NewsList
  newss, //* newss
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!newss.length) { //* newss
    return <h3>No NEWS Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {newss &&   //*news
        newss.map((news) => ( //*news

             //* news._id
          <div key={news._id} className="card mb-3">   
            <h4 className="card-header bg-dark text-white p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${news.newsAuthor}`} //* news.newsAuthor
                >
                  {news.newsAuthor} <br /> 
                  
                  <span style={{ fontSize: '1rem' }}>
                    on {news.createdAt}
                  </span> 
                </Link> //* {news.newsAuthor/ news.createdAt}
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    on {news.createdAt} 
                  </span> 
                </>//* {news.createdAt}
              )} 
            </h4> 
            <div className="card-body bg-dark text-white p-2">
              <p>{news.newsText}</p> 
            </div> 
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/newss/${news._id}`}
            >
              ✍ Leave a comment
            </Link> 
          </div>
        ))} 
    </div>  //* {news.newsText}        /news/${news._id}
  );
};

export default NewsList; //*NewsList
