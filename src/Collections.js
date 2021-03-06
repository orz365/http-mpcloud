const {getToken, deleteToken, clearToken} = require('./utils/token')
const logger = require('./utils/logger')
const axios = require('axios')

/**
 * 微信小程序集合信息、导入导出等操作
 */
class Collections {

    /**
     * 构造函数
     * @param env  环境id
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
     * 获取集合信息
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
     * 数据库迁移状态查询
     * @param job_id 迁移任务ID
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