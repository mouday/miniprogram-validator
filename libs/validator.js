const WxValidate = require('./WxValidate.js');

/**
 * 数据校验
 */
class Validator {
  /**
   *
   * @param {*} rules
   */
  constructor(rules = {}) {
    this.params = this.__convertToWxValidateParams(rules);
  }

  /**
   * 规则转换器
   * @param {*} rules
   * @returns {rules, messages}
   */
  __convertToWxValidateParams(rules) {
    let rules_ = {};
    let messages_ = {};
    let methods_ = {};

    for (let [field, fieldRules] of Object.entries(rules)) {
      rules_[field] = {};
      messages_[field] = {};

      for (let index in fieldRules) {
        let item = fieldRules[index];
        let rule_key;
        let rule_value;

        // 查找规则key
        for (let [key, value] of Object.entries(item)) {
          // 自定义校验规则
          if (key == 'validator') {
            rule_key = `${field}_validator_${index}`;
            rule_value = true;
            methods_[rule_key] = value;
            continue;
          }

          // 预定义校验规则
          if (key != 'message') {
            rule_key = key;
            rule_value = value;
            break;
          }
        }

        if (rule_key) {
          rules_[field][rule_key] = rule_value;
          messages_[field][rule_key] = item.message;
        }
      }
    }

    return {
      rules: rules_,
      messages: messages_,
      methods: methods_,
    };
  }

  /**
   * 校验数据
   * @param {*} data 需要校验的数据对象
   * @param {*} fields 指定字段
   * @returns success: null / error: errorObject
   */
  validate(data, fields = null) {
    // 传入表单数据，调用验证方法
    let rules_ = {};
    let messages_ = {};

    // 可指定校验字段
    if (fields) {
      for (let field of fields) {
        rules_[field] = this.params.rules[field];
        messages_[field] = this.params.messages[field];
      }
    } else {
      rules_ = this.params.rules;
      messages_ = this.params.messages;
    }

    // console.log(rules_);
    // console.log(messages_);
    // console.log(this.params.methods);

    let wxValidate = new WxValidate(rules_, messages_);

    // 自定义验证规则
    for (let [name, method] of Object.entries(this.params.methods)) {
      wxValidate.addMethod(name, method);
    }
    if (!wxValidate.checkForm(data)) {
      return wxValidate.errorList[0];
    }
  }
}

module.exports = Validator;
