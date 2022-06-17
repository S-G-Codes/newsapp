import React  from 'react'

 const NewsItem = (props)=> {
 
      let {title,description,imageUrl,newsUrl,author,date,source} = props
        return (
            <div>
               <div className="card" > 
               <div style={{
                 display : 'flex',
                 justifyContent: 'flex-end',
                 position:'absolute',
                 right: '0'
               }}>

               <span className=" badge rounded-pill bg-danger"  >
    {source}
  </span>
  </div>

               <img src={!imageUrl?"https://images.hindustantimes.com/img/2021/09/03/1600x900/STHPTX7DAFLTHCG62SCSPY5BGI_1630627636322_1630627647254.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">by {!author?"Unknow":author} at {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} rel="noreferrer" target = "_blank" className="btn btn-sm btn-dark">Read more...</a>
  </div>
</div>
            </div>

        )
}

export default NewsItem
