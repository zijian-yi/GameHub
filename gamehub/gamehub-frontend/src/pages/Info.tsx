import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import Profile from '../components/details/Profile';
import Nested from '../components/details/Nested';
import Testimonials from '../components/details/Testimonials';

function Info() {
  return (
  <div className="App">
    <Header />
    <Profile />
    <Testimonials />
    <Nested />
    <Footer />
  </div>
  )
}

export default Info
