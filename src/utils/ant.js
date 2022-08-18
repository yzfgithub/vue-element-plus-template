// import Vue from 'vue'
import {
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Dropdown,
  Form,
  Input,
  Select,
  Button,
  Radio,
  Table,
  ConfigProvider,
  DatePicker,
  Modal,
  Switch,
  // FormModel,
  Tooltip,
  Badge,
  Divider,
  Row,
  Col,
  Progress,
  InputNumber,
  Spin,
  Steps,
  Upload,
  Popconfirm,
  Popover,
  Tabs,
  message,
  Timeline,
  Transfer,
  Empty,
  List,
} from 'ant-design-vue'



  export function registerAntVComponent (instance) {
    instance.config.globalProperties.$message = message;
    instance
    .use(Layout)
    .use(Tabs)
    .use(Menu)
    .use(Icon)
    .use(Breadcrumb)
    .use(Dropdown)
    .use(Form)
    .use(Select)
    .use(Button)
    .use(Radio)
    .use(Table)
    .use(ConfigProvider)
    .use(DatePicker)
    .use(Modal)
    .use(Switch)
    // .use(FormModel)
    .use(Tooltip)
    .use(Badge)
    .use(Divider)
    .use(Row)
    .use(Col)
    .use(Progress)
    .use(InputNumber)
    .use(Spin)
    .use(Steps)
    .use(Upload)
    .use(Input)
    .use(Popconfirm)
    .use(Popover)
    .use(Timeline)
    .use(Transfer)
    .use(Empty)
    .use(List)
  }