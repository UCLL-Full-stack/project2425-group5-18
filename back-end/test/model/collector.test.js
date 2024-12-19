import { Collector } from '../../model/collector';
import { User } from '../../model/user';
import { Collection } from '../../model/collection';

test('given: values for collector, when collector is created, then: collector is created with those values ', () => {
//given
    const user = new User(firstName= "hendriko", lastName = "le roi", username = "patje", email = "hendrik@dfjk.com", password =  "renzogpt", birthDate = Date(15022005) , address= "brussel", role = "AMDIN" )
    const saab1 = new Car ({ brand: "saab",model:  "900",color:  "blue",year:  1994,fuel:  "BENZINE", transmission: "MANUEEL", distance: 1, picture: "https://jsdfhdjf.jpg"});
    const saab2 = new Car ({ brand: "saab",model:  "9000",color:  "green",year:  1993,fuel:  "BENZINE", transmission: "AUTOMATISCH", distance: 1, picture: "https://jsdfhdjf.jpg"});
    const saab3 = new Car ({ brand: "saab",model:  "96",color:  "red",year:  1972 ,fuel:  "BENZINE", transmission: "MANUEEL", distance: 1, picture: "https://jsdfhdjf.jpg"});
    const chrysler = new Car ({ brand: "chrysler",model:  "le barond",color:  "red",year:  1993,fuel:  "BENZINE", transmission: "AUTOMATISCH", distance: 1, picture: "https://jsdfhdjf.jpg"});
    const cars = [saab1, saab2];
    const cars2 = [saab3, chrysler];
    const name = "mijn schone saab collectie";
    const description = "ik hou van saab";
    const name2 = "rode autos";
    const description2 = "ik hou van saab *2 ";
    const ownerId = 1;
    const collection = new Collection ({ cars, name, description, ownerId});
    const collection2 = new Collection ({ cars2, name2, description2, ownerId});
    const collections = ([collection, collection2]);
    const profileDescription = "saab fan"

    //when
const collector = new Collector ({ user, collections, profileDescription})
//then
 expect(collector.user).toEqual(user);
 expect(collector.collections).toEqual(collections);
 expect(collector.profileDescription).toEqual(profileDescription);


});

