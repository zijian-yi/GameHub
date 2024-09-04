import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

export default function Spotlight() {
  const games = [
    {
      img: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000063714/276a412988e07c4d55a2996c6d38abb408b464413b2dfeb44d2aa460b9f622e1',
      title: 'The Legend of Zelda: Tears of the Kingdom',
      description: 'An epic adventure awaits in the Legend of Zelda: Tears of the Kingdom game, only on the Nintendo Switch system.'
    },
    {
      img: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000033131/dbc8c55a21688b446a5c57711b726956483a14ef8c5ddb861f897c0595ccb6b5',
      title: 'Hades',
      description: 'The Olympians have your back! Meet Zeus, Athena, Poseidon, and many more, and choose from their dozens of powerful Boons that enhance your abilities.'
    },
    {
      img: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/en_US/games/switch/i/it-takes-two-switch/hero',
      title: 'It Takes Two',
      description: 'Embark on the craziest journey of your life in It Takes Two, a genre-bending platform adventure created purely for co-op.'
    }
  ];

  return (
    <MDBCarousel
      showIndicators
      showControls
      fade
      className="carousel-inner rounded-6 img-fluid mb-5"
      style={{ width: "90%", margin: "auto" }}
    >
      {games.map((game, index) => {
        return (
          <MDBCarouselItem
            className="w-100 d-block img-fluid"
            itemId={index + 1}
            src={game.img}
            alt="spotligt image"
          >
            <h5>{game.title}</h5>
            <p>{game.description}</p>
          </MDBCarouselItem>
        );
      })}
    </MDBCarousel>
  );
}