import Mock from 'mockjs'
import createResponse from './response'

Mock.mock('/appStore/v1.0/dashboard/getMemberInfoList', (req) => {
    const page = JSON.parse(req.body).page;
    const pageSize = JSON.parse(req.body).pageSize;
    let list = [];
    for(let i = 0; i< pageSize; i++ ) {
        let obj = {
            realName: 'realName'+ ((page-1)*10 +i),
            phone: 'phone'+ ((page-1)*10 +i),
            email: 'email'+ ((page-1)*10 +i),
            type: 'type'+ ((page-1)*10 +i),
            companyName: 'companyName'+ ((page-1)*10 +i),
            address: 'address'+ ((page-1)*10 +i),
            operation: 'operation' + ((page-1)*10 +i),
            id: ((page-1)*10 +i)
        }
        list.push(obj)
    }
    return createResponse({
        result: list, total: 101, page: page, pageSize: pageSize
    })
})

Mock.mock('/appStore/v1.0/dashboard/getMemberGroupLeft', (req) => {
    let list = [];
    for(let i = 0; i< 5; i++ ) {
        let obj = {
            name: 'name'+ i,
            memberTotal: 'memberTotal'+ i,
            id: i
        }
        list.push(obj)
    }
    return createResponse(list)
})