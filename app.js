// const userService = require('./services/user-service');
// const hotelService = require('./services/hotel-service');
// const priceService = require('./services/price-service');
// const helper = require('./services/helper');
const { distance } = require('./services/helper');
const { getHotels } = require('./services/hotel-service');
const { getPrices } = require('./services/price-service');

const radiusFilter = (lat, lng, radius) => (hotel) => {
    const d = distance(lat, lng, hotel.latitude, hotel.longitude);
        if (d < radius) // < 2km
        return{// structure de réponse
            idCOde: hotel.ridCode,
            countryCode: hotel.countryCode,
            localRating: hotel.localRating,
            address: hotel.address,
            comercialName: hotel.comercialName,
            distance: parseFloat(d).toFixed()
        }
}

function findHotelsNearby(lat, lng, radius) {
    // 48.856564, 2.351711, 2000 
    // const d = distance(lat, lng, hotel.latitude, hotel.longitude);
    const allHotels = getHotels().filter((hotel) => {
        const d = distance(lat, lng, hotel.latitude, hotel.longitude); 
        console.log(d,'distance'); // liste des distances
        return d < radius // < 2km
    });
    console.log(allHotels, "allHotels"); // liste des hotels 
    return getHotels().filter(radiusFilter(lat, lng, radius)); //filter by radius 
}








const getPriceOfferHotelbyDate = (ridCode, date) => {
    const { offers } = getPrices().find((price) => price.ridCode === ridCode);
    return offers.filter((offer) => offer.date === date);
}

const offerByHotel = (hotelsNearby, date) => {
    hotelsNearby.flatMap((hotel) => {
        const priceOffer = getPriceOfferHotelbyDate(hotel.ridCode, date).map((offer) =>{
            return {
                ...hotel,
                offer, 
            };
        });
       
    });
}

// const priceAsc = (prev, next) => {
//     if(prev.offer.price < next.offer.price){
//         return -1;
//     }
//     if(prev.offer.price > next.offer.price){
//         return 1;
//     }
//     return 0;
// };

// const getTopOffer = (offers) => offers.sort(priceAsc).slice(0, 1);

// const getTopOffersDate = (ridCode, date) => {
//     const { offers } = getPrices().find((price) => price.ridCode === ridCode);
//     return offers.filter((offer) => offer.date === date);
// }

// const getTopOfferDate = (hotelsNearby, date) => {
//     const [bestOffer] = getTopOffer(hotelsNearby, date);
//     return topOffer;
// }


function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
    // TODO implement me

    const hotelsNearby = findHotelsNearby(lat, lng, radius);

    // const topOffer = getTopOfferDate(hotelsNearby, date);

    const offerHotel = offerByHotel(hotelsNearby, date);

    console.log(offerHotel, "offerbyHotel");

    return  null;
}

module.exports = {
	findHotelsNearby: findHotelsNearby,
	findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer
}
