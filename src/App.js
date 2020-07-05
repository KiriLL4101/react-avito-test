import React from 'react';
import ModalCommets from './componets/ModalCommets'
import axios from 'axios';

import './app.scss';

function App() {
  const [ gallary , setGallary ] = React.useState(null);
  const [ infoModal , setInfoModal ] = React.useState({});
  const [ isOpen , setIsOpen ] =React.useState(false)

  function instansImg(id){
    axios
    .get("https://boiling-refuge-66454.herokuapp.com/images/" + id)
    .then(({ data }) => {
      setInfoModal(data);
      setIsOpen(true)
    });
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
      {
        isOpen && 
          <ModalCommets onClose={() => setIsOpen(false)} infoModal={ infoModal }/>
      }
      <footer className="footer">
        <span>&copy; 2018-2019</span>
      </footer>
    </div>
  );
}

export default App;
