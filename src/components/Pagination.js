import React from 'react'

const Pagination = () => {
    let pages = []
    
for(int = 1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
    pages.push(i)
}

  return (
    <div>Pagination</div>
  )
}

export default Pagination