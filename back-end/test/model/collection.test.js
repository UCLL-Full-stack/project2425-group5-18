import { Car } from '../../model/car';
import { Collection } from '../../model/collection';
test('given: values for collection, when collection is created, then: scar is created with those values ', () => {
//given
    const saab1 = new Car ({ brand: "saab",model:  "900",color:  "blue",year:  1994,fuel:  "BENZINE", transmission: "MANUEEL", distance: 1, picture: "https://jsdfhdjf.jpg"});
    const saab2 = new Car ({ brand: "saab",model:  "9000",color:  "green",year:  1993,fuel:  "BENZINE", transmission: "AUTOMATISCH", distance: 1, picture: "https://jsdfhdjf.jpg"});
    const cars = [saab1, saab2];
    const name = "mijn schone saab collectie";
    const description = "ik hou van saab";
    const ownerId = 1;
    

    //when
const collection = new Collection ({ cars, name, description, ownerId})
//then
 expect(collection.cars).toEqual(cars);
 expect(collection.name).toEqual(name);
 expect(collection.description).toEqual(description);
 expect(collection.ownerId).toEqual(ownerId);

});



