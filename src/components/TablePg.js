import React, {useEffect, useState, Fragment } from 'react';
import usePagination from './usePagination';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';



const TablePg = () => {

  const itemsPerPage = 5
  const startFrom =4
  const [data, setData] = useState([]); 
  const { slicedData, pagination, prevPage, nextPage, changePage } = usePagination({ itemsPerPage, data, startFrom });

    useEffect(() => {

    
      loadData();
     
    
     
    }, []);
    const loadData = async() => {
      axios.get('http://localhost:5000/api/clientgetdata')
      
        .then(response => {
          setData(response.data.map(d => {
            return{
              select: false,
              id: d._id,
              clientName : d.clientName,
              companyName: d.companyName,
              clientStatus: d.clientStatus
            }
          }));
          console.log(data)
        
        }).catch(function (error) {
            console.log(error);
        })
     
    }   
    
    console.log("slicedData:",slicedData)
    console.log("LoadData:",loadData)
  
   

  
  return(
    <>
    <Fragment>
<>
     
     
      <div className="row hrtable">
        <div className="col-lg-10 col-sm-6 col-md-6">
          <div className="table-responsive tcenter" >
            <table className="table table-bordered table-hover table-sm">
              <thead className="thead-dark">
                <tr>                 
                  <th scope="col"><input type="checkbox" /></th>
                  {/* <th scope="col">Client ID</th> */}
                  <th scope="col">Client Name</th>
                  <th scope="col">Client Company Name</th>
                  <th scope="col">Status</th>  
                  {/* {<th scope="col">Taskname</th>  } */}
                  <th>Action</th>        
                </tr>
              </thead>
              <tbody>
                { (slicedData.length > 0) ? slicedData.map( (droplet, index) => {
                  return (
                    <tr key={ droplet.id }>
                      <th scope="row">
                        <input type="checkbox"/>
                      </th>
                      <td>{ droplet.clientName }</td>
                      <td>{ droplet.companyName}</td>
                      <td>{ droplet.clientStatus }</td>    
                              
                    </tr>                    
                  )
                }) : <tr><td colSpan="5">No Records Found</td></tr> }
               
                    
              </tbody>
            </table>
            </div> 
          </div>
          
          </div>
    </>

      <nav className="pagination">
        <a href="/#" className="pagination-previous" onClick={prevPage}>Previous</a>
        <a href="/#" className="pagination-next" onClick={nextPage}>Next</a>
        <ul className="pagination-list">
          {pagination.map(page => {
              if(!page.ellipsis) {
                return <li key={page.id}>
                  <a 
                    href="/#"
                    className={page.current ? 'pagination-link is-current' : 'pagination-link'}
                    onClick={(e) => changePage(page.id, e)}
                  >
                    {page.id}
                  </a>
                </li>
              }else {
                return <li key={page.id}><span className="pagination-ellipsis">&hellip;</span></li>
              }
          })}
        </ul>
      </nav>
    </Fragment>
    </>
  );
}

export default TablePg;