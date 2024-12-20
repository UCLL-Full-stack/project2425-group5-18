import { User } from '../../model/user';
import { set } from 'date-fns'

test('given: values for user, when user is created, then: user is created with those values ', () => {
//given
    const firstName = "thomas";
    const lastName = "debacker";
    const username = "tommy";
    const email = "tommy@dvjkd.cef";
    const password = "ikcarrydit";
    const birthDate = set(Date(now()));
    const address = "leuven";
    const role = "https://tommy.be/image1.png" 
    //when
const user = new User ({ firstName, lastName, username, email, password, birthDate, address, role})
//then
 expect(user.firstName).toEqual(firstName);
 expect(user.lastName).toEqual(lastName);
 expect(user.username).toEqual(username);
 expect(user.email).toEqual(email);
 expect(user.password).toEqual(password);
 expect(user.birthDate).toEqual(birthDate);
 expect(user.address).toEqual(address);
 expect(user.role).toEqual(role);
});



