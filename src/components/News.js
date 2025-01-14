import React, { Component } from 'react';
import Spinner from './Spinner'
class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl } = this.props;
    return (
      <div className="card h-100">
        <div className="image-container" style={{ height: '200px', overflow: 'hidden' }}>
          <img
            src={imageurl}
            className="card-img-top"
            alt="news"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop';
            }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5
            className="card-title"
            style={{
              height: '52px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </h5>
          <p
            className="card-text"
            style={{
              height: '72px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </p>
          <a href={newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export class News extends Component {
  articles = [
    // ... (Your articles array remains the same)
  ];

 
  constructor() {
    super();
    this.state = {
      articles: [], // Assuming you will fetch the articles
      page: 1,
      isDarkMode: false,
    };
    }
  
    toggleMode = () => {
      this.setState((prevState) => {
        const isDarkMode = !prevState.isDarkMode;
        if (isDarkMode) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
        return { isDarkMode };
      });
    };

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b899c96d063743f9bd1c3ada613027dd&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles,
      totalResults:parsedData.totalResults, 
        loading:false})
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b899c96d063743f9bd1c3ada613027dd&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    });
  };

  handleNextClick = async () => {
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)))
    {
    
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b899c96d063743f9bd1c3ada613027dd&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({loading:false});
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });
  } 
  };

  render() {
    const { isDarkMode } = this.state;
    return (
      <div className="container my-4">
        <div className="d-flex justify-content-end mb-4">
          <button className="btn-toggle" onClick={this.toggleMode}>
            {isDarkMode ? 'Light' : 'Dark'}
          </button>
        </div>
        <h1 className="text-center mb-4">NewsMonkey - Top Headlines</h1>
        {this.state.loading&& <Spinner/>}
        <div className="row">
          {!this.state.loading&&this.state.articles.map((element, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <NewsItem
                title={element.title}
                description={element.description}
                imageurl={element.urlToImage}
                newsurl={element.url}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>
            &larr; Previous
          </button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;