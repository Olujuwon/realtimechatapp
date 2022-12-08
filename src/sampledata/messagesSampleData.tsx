import {faker} from "@faker-js/faker";
import {messageType} from "../types/Message/message";
import {mainUserUid, otherUserUid} from "../redux/userSlice";

export const SAMPLEMESSAGES: messageType[] = [];

const status = ["delivered", "unread", "sent", "read"]

export function generateCustomMessageStatus() {
    return status[Math.floor(Math.random()*status.length)]
}

export function createRandomTOMessages(mainUserId: String, otherUserId: String, switchIds: boolean): messageType {
    return {
        data: faker.lorem.paragraph(),
        timeStamp: (new Date(faker.date.recent(1))).valueOf(),
        uid: faker.datatype.uuid(),
        status: generateCustomMessageStatus(),
        sender: [switchIds ? otherUserId : mainUserId],
        receiver: [switchIds ? mainUserId : otherUserId]
    };
}

export function createRandomFromMessages(mainUserId: String, otherUserId: String, switchIds: boolean): messageType {

    return {
        data: faker.lorem.paragraph(),
        timeStamp: faker.date.recent(0),
        uid: faker.datatype.uuid(),
        status: faker.word.verb(8),
        sender: [switchIds ? mainUserId : otherUserId],
        receiver:[switchIds ? otherUserId : mainUserId]
    };
}

Array.from({length: 10}).forEach(() => {
    SAMPLEMESSAGES.push(createRandomTOMessages(mainUserUid, otherUserUid,false));
    SAMPLEMESSAGES.push(createRandomFromMessages(mainUserUid, otherUserUid, false));
})