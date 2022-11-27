import Image from "next/image";

const offers = [
  {
    id: 1,
    title: 'Apple',
    image: '/images/apple.png',
    description: 'Laptops, tablets, phones and audio'
  },
  {
    id: 2,
    title: 'Samsung',
    image: '/images/samsung.jpg',
    description: 'Televisions, phones and appliances'
  },
  {
    id: 3,
    title: 'Sony',
    image: '/images/sony.jpg',
    description: 'Phones, TVs and audio devices'
  },
  {
    id: 4,
    title: 'LG',
    image: '/images/lg_appliances.jpg',
    description: 'TVs and household appliances'
  },

]

const Offers = () => {
  return <section className="py-4 px-4">
    <h3 className="text-center text-xl font-medium text-slate-600">Discover our offers</h3>
    <div className="max-w-7xl mx-auto mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       {offers.map((offer) => (
        <div key={offer.id} className="w-full relative isolate">
          <Image src={offer.image} alt={offer.title} width={1920} height={1280} className="w-full aspect-video rounded-lg shadow" />
          <div className="w-full p-3">
            <p className="text-xl font-medium text-slate-600 text-center">{offer.title}</p>
            <p className="text-md font-medium text-brown text-center">{offer.description}</p>
          </div>
        </div>
       ))}
    </div>
  </section>;
};
export default Offers;
