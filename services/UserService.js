export const validateEmail = (text) => {
    const regex1 = /^\S+@\S+\.\S+$/;
    const regex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (regex1.test(text) === false && regex2.test(text) === false) {
        return false;
    }
    else {
        return true;
    }
}

// ********************************************* Server Requests ********************************************* 