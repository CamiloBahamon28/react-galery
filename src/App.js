import { Route, Switch } from 'react-router-dom'

import { ImageDetail } from './pages/ImageDetail';
import { ImageForm } from './pages/ImageForm';
import { ImageGallery } from './pages/ImageGallery';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Navbar } from './components/Navbar';

function App() {
  return (

    <div className="bg-dark text-light">
      <Navbar />

      <div className="container p-4">
        <Switch>
          <Route path="/" component={ImageGallery} exact />
          <Route path="/upload" component={ImageForm} />
          <Route path="/images/:id" component={ImageDetail} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
