import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageurl,newsurl,author,date,source}=this.props;
    return (
      <div>
      <div className="my-4">
        <div  className="card" >
        <div style={{
            display:'flex',
            juatiftContent:'flex-end',
            position:'absolute',
            right:'0'
          }}
        >
        </div>
        <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger" style={{ transform: 'translate(50%, -50%)', zIndex: '1' }}>
  {source}
</span>
  <img src={imageurl} className="card-img-top" alt="..."/>
  <div  className="card-body">
    <h5  className="card-title">{title}</h5>
    <p  className="card-text">{description}...</p>
    <p  className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsurl}   target="blank"className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
      </div>
    )
  }
}

export default NewsItem