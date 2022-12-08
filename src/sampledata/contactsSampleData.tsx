import {faker} from "@faker-js/faker";
import {contactType} from "../types/Contact/contact";
import {mainUserUid, otherUserUid} from "../redux/userSlice";

export const SAMPLECONTACTS: contactType[] = [];

const onlineStatus = [true, false]

export function generateCustomContactOnlineStatus() {
    return onlineStatus[Math.floor(Math.random()*onlineStatus.length)]
}

export function createRandomContacts(customUid?: string): contactType {
    return {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        profileImg: faker.image.people(200, 200, true),
        uid: customUid ? customUid : faker.datatype.uuid(),
        contacts: [mainUserUid],
        online: generateCustomContactOnlineStatus(),
        birthday: (new Date(faker.date.birthdate())).valueOf(),
        phone: [
            {home: faker.phone.number('+358 400 ### ###')}
        ]
    };
}

export function createMainUserContactObject(): contactType {
    const mainUserContacts: Array<string> = [];
    SAMPLECONTACTS.forEach((sampleContact)=>mainUserContacts.push(sampleContact.uid));
    return {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        profileImg: faker.image.people(200, 200, true),
        uid: mainUserUid,
        contacts: mainUserContacts,
        online: generateCustomContactOnlineStatus(),
        birthday: (new Date(faker.date.birthdate())).valueOf(),
        phone: [
            {home: faker.phone.number('+358 400 ### ###')}
        ]
    };
}

Array.from({length: 10}).forEach((value, index) => {
    if (index === 0){
        SAMPLECONTACTS.push(createRandomContacts(otherUserUid));
    }
    SAMPLECONTACTS.push(createRandomContacts());
});
SAMPLECONTACTS.push(createMainUserContactObject());