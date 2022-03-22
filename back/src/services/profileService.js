import { Profile } from "../db"
import { v4 as uuidv4 } from 'uuid'

class profileService {
    static async addProfile({user_id, path_name, file_name}){
        const id = uuidv4()
        console.log(user_id)
        let [createNewProfile] = await Profile.findProfileByUserId({user_id})
        console.log(createNewProfile)
        if(createNewProfile){
            const errorMessage = '프로필이미지가 이미 설정되어 있습니다. 프로필 변경을 이용해주세요.'
            return { errorMessage }
        }

        const newProfile = { id, user_id, path_name, file_name }
        createNewProfile = await Profile.create({ newProfile })

        return createNewProfile
    }

    static async getProfile({user_id}){
        const [profile] = await Profile.findProfileByUserId({user_id})
        console.log(profile)

        if(!profile){
            const errorMessage = '프로필 이미지가 저장되어 있지 않습니다. 프로필 이미지 지정 후 재시도 해주세요'
            return { errorMessage }
        }
        return profile

    }

    static async setProfile({id, toUpdate}){
        let profile = await Profile.findProfileById({id})
        if(!profile){
            const errorMessage = '수정할 프로필 내역이 존재하지 않습니다. 다시 한 번 확인해 주세요.'
            return { errorMessage }
        }

        if(!toUpdate.file_name || !toUpdate.path_name || !toUpdate.user_id){
            const errorMessage = '프로필 상세 내용을 확인해 주세요.'
            return { errorMessage }
        }

        profile = await Profile.updateProfile({id, toUpdate})
        return profile
    }
}

export { profileService }