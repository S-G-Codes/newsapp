import React, {useEffect , useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  
 const CapitlizeString = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
 }
  // constructor(props) {
  //   super(props);
    // console.log('Hello I am a Constructorr');
    //this.state cant be set like that only you need to use    this.set.state
    //and also you can use props to pass state
  
  // }
  //this async awiat means this will go async till await comes means it will stop at await till he completes his promise means till he fetches his data and then move forward
 
 
  const updateNews = async ()=>{
   props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true);
  let data = await fetch(url);
  props.setProgress(50);

  let parsedData = await data.json();
  props.setProgress(70);
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
  setLoading(false)

  console.log(parsedData);
  // this.setState({
  //   articles: parsedData.articles,
  //   totalResults: parsedData.totalResults,
  //   loading: false,
  // });
  props.setProgress(100);
 }
 
 
 
 useEffect(() => {
  document.title = `${CapitlizeString(props.category)} -SG News`
   updateNews(); 
   // eslint-disable-next-line
 }, [])
 
 
  // async componentDidMount() {
  //   console.log("cmd");
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
  // }

//  const  handleprevButton = async () => {
//     console.log("Previous  button was clicked");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   props.country
    // }&category=${
    //   props.category
    // }&apiKey=7b83f564859f40e89a9de5f4df4160b4&page=${
    //   this.state.page - 1
    // }&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
  //   setPage(page-1)
  //   updateNews();
  // };

//  const  handlenextButton = async () => {
//     console.log("Next button was clicked");
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     props.country
    //   }&category=${
    //     props.category
    //   }&apiKey=7b83f564859f40e89a9de5f4df4160b4&page=${
    //     this.state.page + 1
    //   }&pageSize=${props.pageSize}`;
    //   this.setState({ loading: true });
    //   // this above logic for when data is loadinng show spinner
    //   let data = await fetch(url);
    //   let parsedData = await data.json();

    //   console.log(parsedData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
  //   setPage(page+1)
  //   updateNews();

  // };

 const  fetchMoreData = async () =>{
    setPage(page+1)

    const  url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json();

  console.log(parsedData);
  setArticles(articles.concat(parsedData.articles))
  setTotalResults(parsedData.totalResults)
 
  };

    // console.log('render');           this to show that constructor is running first and then render and then mount

    return (
      <>
        <h1 className="text-center" style={{ margin: '40px' , marginTop: '70px'}}>
        
          SG news Top-Headlines from {CapitlizeString(props.category)} category
        </h1>
        {loading && <Spinner />}
        {/* thismeans this.state.loading horeh hai toh spinner dikayee varna maat dikiya */}
        <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">

                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between  ">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevButton}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handlenextButton}
          >
            Next &rarr;
          </button>
        </div> */}
        </>

    );
  
}

 News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "General",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News