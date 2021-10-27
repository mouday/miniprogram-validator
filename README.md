# miniprogram-validator

基于 [WxValidate - 表单验证](https://github.com/wux-weapp/wx-extend/blob/master/docs/components/validate.md) 扩展的微信小程序表单验证器,规则配置可参考其文档。

配置规则格式参考 ElementUI 使用的[async-validator](https://github.com/yiminghe/async-validator)

表单校验的方案：

- 后端校验：无论前端是否校验，数据入库前都需要进行校验
- 前端校验：如果需要提升用户体验或者减少请求次数的情况下，前端需要数据校验。如果应用的要求不高，可以免去前端校验

## 使用示例

将两个文件拷贝到文件夹下

```
utils/
    validator.js
    WxValidate.js
```

```js
const Validator = require('./validator.js');

// 需要校验的数据
let data = {
  name: 'Tom',
  age: 10,
  school: 'A',
};

// 校验规则 {field: rules}
let rules = {
  name: [{ message: '姓名不能为空', required: true }],
  age: [
    { message: '年龄不能为空', required: true },
    { message: '年龄不能大于10', max: 10 },
  ],
  school: [
    {
      message: '学校只能是A/B',
      validator: (value, param) => {
        return !value || (value && ['A', 'B'].includes(value));
      },
    },
  ],
};

let validator = new Validator(rules);
let error = validator.validate(data);

if (error) {
  console.log('校验出错');
  console.log(error);
} else {
  console.log('校验通过');
}
```

完整代码：
[]()