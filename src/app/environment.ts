export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCYCaImUWo1EgpjE-83Xwpl0xX2KiNvpRI",
    authDomain: "aircleaner-5092f.firebaseapp.com",
    databaseURL: "https://aircleaner-5092f-default-rtdb.firebaseio.com",
    projectId: "aircleaner-5092f",
    storageBucket: "aircleaner-5092f.appspot.com",
    messagingSenderId: "132830224871",
    appId: "1:132830224871:web:e87dd4c1a0f5d577935d42",
    measurementId: "G-TQJNJZ65ZX"
};

export const snapshotToArray = snapshot => {
    let returnArray = []
    snapshot.forEach(element => {
        let item = element.val()
        item.key = element.key
        returnArray.push(item)
    });
    return returnArray
}