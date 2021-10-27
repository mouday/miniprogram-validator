const Validator = require('./libs/validator.jstor.js.js');

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
