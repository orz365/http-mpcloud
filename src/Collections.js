const {getToken, deleteToken, clearToken} = require('./utils/token')
const logger = require('./utils/logger')
const axios = require('axios')

/**
 * ΢��С���򼯺���Ϣ�����뵼���Ȳ���
 */
class Collections {

    /**
     * ���캯��
     * @param env  ����id
     * @param appid   appid
     * @param appsecret  appsecret
     * @param access_token  access_token
     */
    constructor({env, appid, appsecret, access_token}) {
        this.env = env
        this.appid = appid
        this.appsecret = appsecret
        this.access_token = access_token
    }


    /**
     * ��ȡ������Ϣ
     * @return {Promise}
     */
    async get(data = {}) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        data.env = this.env

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/databasecollectionget?access_token=${access_token}`, data).then(res => {
                let data = res.data
                if (data.errcode !== 0) {
                    reject(res)
                } else {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * ���ݿ�Ǩ��״̬��ѯ
     * @param job_id Ǩ������ID
     * @return {Promise}
     */
    async migrateInfo(job_id) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let data = {
            env: this.env,
            job_id
        }

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/databasemigratequeryinfo?access_token=${access_token}`, data).then(res => {
                let data = res.data
                if (data.errcode !== 0) {
                    reject(res)
                } else {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }
}

module.exports = Collections