
const rules = {
    name: [
        {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
        }
    ],
    sex: [
        {
            required: true,
            message: '请选择性别',
            trigger: 'change'
        }
    ],
    phone: [
        {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
        },
        {
            message: '手机号格式不正确',
            trigger: 'blur',
            pattern: /^1[2-9]\d{9}$/
        }
    ],
    type: [
        {
            required: true,
            message: '请选择员工类型',
            trigger: 'blur'
        }
    ],
    credentialsType: [
        {
            required: true,
            message: '请选择证件类型',
            trigger: 'change'
        }
    ],
    credentialsNo: [
        {
            required: true,
            message: '请输入身份证号',
            trigger: 'blur'
        },
        {
            message: '身份证号格式不正确',
            trigger: 'blur',
            pattern: /(^\d{18}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        }
    ],
    email: [
        {
            type: 'email',
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
        }
    ],
    orgCode: [
        {
            required: true,
            message: '请选择所属组织',
            trigger: 'change'
        }
    ]
}

const labelCol = { span: 6 }
const wrapperCol = { span: 18 }
const type = [{ label: '合作伙伴', value: 1 }]
const certificate = [{ label: '身份证', value: 1 }]

export default function AddNewUser() {

    return {
        rules, labelCol, wrapperCol, type, certificate
    }
}