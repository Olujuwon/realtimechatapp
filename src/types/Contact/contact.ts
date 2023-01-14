export interface contactType {
    name: string,
    email: string
    profileImg: string,
    uid: string,
    contacts: Array<string>,
    birthday: Object,
    online: boolean,
    phone:[
        {home: string}
    ],
    userUid?: string
}