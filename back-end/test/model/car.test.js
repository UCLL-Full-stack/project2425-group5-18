import { Car } from '../../model/car';
import { Fuel, Transmission } from '../../types/index';


test('given: values for car, when car is created, then: scar is created with those values ', () => {
//given
    const brand = "toyota";
    const model = "coraolla";
    const color = "yellow";
    const year = 1985;
    const fuel = "DIESEL";
    const transmission = "MANUEEL";
    const distance = 20;
    const picture = "https://hendrik.be/image1.png" 
    //when
const car = new Car ({ brand, model, color, year, fuel, transmission, distance, picture})
//then
 expect(car.brand).toEqual(brand);
 expect(car.model).toEqual(model);
 expect(car.color).toEqual(color);
 expect(car.year).toEqual(year);
 expect(car.fuel).toEqual(fuel);
 expect(car.transmission).toEqual(transmission);
 expect(car.distance).toEqual(distance);
 expect(car.picture).toEqual(picture);
});