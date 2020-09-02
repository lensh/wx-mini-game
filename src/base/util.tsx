import Taro from '@tarojs/taro'

export const request = (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        Taro.request({
            url:data.url,
            data,
            header: { 'content-type': 'application/json' },
            success: function (res) {
                resolve(res.data)
            }
        })
    })
}
