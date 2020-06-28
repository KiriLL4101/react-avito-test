import React from 'react';
import ModalCommets from './componets/ModalCommets'
import axios from 'axios';

import './app.scss';

function App() {
  const [ gallary , setGallary ] = React.useState(null);
  const [ isOpen , setIsOpen ] = React.useState(false);
  const [ idImg , setIdImg ] = React.useState(237)
  
  function instansImg(url){
    setIdImg(url);
    setIsOpen(true)
  }
  function hideModalComments() {
    setIsOpen(false)
  }
  React.useEffect( () => {
    axios.get('https://boiling-refuge-66454.herokuapp.com/images').then(({ data }) => {
      setGallary(data)
    })
  }, [])
  return (
    <div className='wrap'>
      <header className="header">
        <h1>Test App</h1>
      </header>
      <div className='gallry'>
      {
        !gallary ? "Загрузка..." : 
          gallary.map( image => (
              <img src={image.url} alt='Изображение' key={image.id} onClick={instansImg.bind(null, image.id)}/>
          ))
      }
      </div>
      <ModalCommets isOpen={ isOpen } onClickClose={hideModalComments} idImg={ idImg }/>
      <footer className="footer">
        <span>&copy; 2018-2019</span>
      </footer>
    </div>
  );
}

export default App;
