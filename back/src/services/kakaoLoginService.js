import axios from "axios";

const getUserInfo = async (token) => {
    try{
        return await axios(process.env.KAKAO_GET_USER_INFO_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.data)

    }catch (e) {
        throw new Error(e.data)
    }
}

export { getUserInfo }