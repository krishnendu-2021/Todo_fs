import React from 'react'
// import noteContext from '../context/noteContext'
import Notes from './Notes';

export const Home = (props) => {

  return (
    <>
      
     <Notes showAlert={props.showAlert}/>
    </>
  )
}
