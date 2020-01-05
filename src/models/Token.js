export default class Token {
    constructor(username = "", flag = false){
        this.username = username;
        this.flag = flag;
    }

    getToken(){ 
        return {username: this.username, flag: this.flag};
    }

    setFlag(flag){
        this.flag = flag;
    }
}