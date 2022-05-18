import React from 'react'
import Notes from '../component/Notes'

const Home = (props) => {
  const{ showAlert}=props
  
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  )
}

export default Home
