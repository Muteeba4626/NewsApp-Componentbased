import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import NewsItem from './NewsItem'; // Import the correct NewsItem component
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
capitalizeFirstLetter= (string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      isDarkMode: false,
      loading: true,  
      totalResults:0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}- NewsMonkey`;
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

  async updatedNews(pageNo)
  {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b899c96d063743f9bd1c3ada613027dd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      
    });
    this.props.setProgress(100);
  }
  




  async componentDidMount() {
    this.updatedNews();
  }

  handlePrevClick = async () => {
    
    this.setState({page:this.state.page+1});
    this.updatedNews();
  };

  handleNextClick = async () => {
    
    this.setState({page:this.state.page-1});
    this.updatedNews();
  };

  fetchMoreData =async () => {
    this.setState({page:this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b899c96d063743f9bd1c3ada613027dd&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      
    })

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
          <h1 className="text-center mb-4">NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {

            this.state.articles.map((element,index) => (
              <div className="col-md-4 mb-4" key={index}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
        </div>
        </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          
        </div>
      </div>
    );
  }
}

export default News;